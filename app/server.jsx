import config from './config/server';
import express from 'express';
import serveStatic from 'serve-static';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

import fs from 'fs';
import path from 'path';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server';
import App from './app.jsx';

import basicAuth from 'basic-auth';
import apiRouter from './api';
import { decodeAuth } from './lib/session';

import { makeInitialStore, dehydrate } from './store/server';

// LOGIC
var cssContent = "";
const cssFile = path.join(__dirname, '..', 'public', 'main.bundle.css');

function refreshCss() {
  if(fs.existsSync(cssFile))
    cssContent = fs.readFileSync(cssFile).toString();
}

// BUNDLE SERVED FROM MEMORY
if(!config.DEBUG) {
  // EMBEDED FRESH CSS BUNDLE FOR PRODUCTION
  setInterval(refreshCss, 1000 * 60);
  refreshCss();

  if(!cssContent)
    console.error("ERROR: The CSS bundle files are not present.\n" +
                  "       Make sure you build the app before you run the server with \"make build\"\n");
}

// SERVER LOGIC
var app = express();

// FAVICON
app.use(favicon(path.join(__dirname, 'media', 'favicon.ico')));

// HTTP AUTH?
if(config.HTTP_USER && config.HTTP_PASSWORD){
	console.log((new Date()).toJSON() + " | " + config.APP_NAME + " using HTTP Auth", "\n");
  app.use(function(req, res, next){
    const credentials = basicAuth(req);

    if(!credentials || credentials.name !== config.HTTP_USER || credentials.pass !== config.HTTP_PASSWORD) {
      res.setHeader('WWW-Authenticate', `Basic realm="${config.APP_NAME}"`)
      res.status(401).end('Unauthorized');
    }
    else next();
  });
}

// STATIC FILES
app.get('/main.bundle.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.setHeader('Cache-Control', 'public, max-age=' + (config.CACHE_MAX_AGE/1000));
  res.send(cssContent);  // vendor is served here - app is embedded
});

app.use(serveStatic(path.join(__dirname, '..', 'public'), { maxAge: config.CACHE_MAX_AGE }));

// API
app.use(cookieParser()); // The API router and the initial render need them
app.use(apiRouter);

// RENDER THE MAIN PAGE
app.use(decodeAuth, async (req, res) => {
	// req.user is set in decodeAuth
	try {
    const context = {};
		const store = await makeInitialStore({
			userId: req.user && req.user._id
		});
    const markup = renderToString(
      <Provider store={ store }>
        <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
      </Provider>
    );

    if(context.url){
      return res.redirect(302, context.url);
    }
    else if(!markup){
      return res.status(404).send('');
    }
    else {
      const initialState = dehydrate(store);
      if(context.status)
        return res.status(context.status).send(renderPage(markup, initialState));
      else
        return res.send(renderPage(markup, initialState));
    }
	}
	catch(err){
		console.error("SERVER RENDER ERROR:", err);
		res.status(500).send(err.message);
	}
});


// HELPER FUNCTIONS

function renderPage(markup, initialState) {
  if(config.DEBUG){
    // DEBUG: The bundle is served separately
    //        The initial FOUC is hidden
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
          <link href="https://fonts.googleapis.com/css?family=Megrim|Raleway:400,700" rel="stylesheet">
          <title>${config.HTML_TITLE}</title>
          <style>
          .skip-fouc {
            opacity: 0;
          }
          </style>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
        </head>
        <body>
          <div id="root" class="skip-fouc">${markup}</div>
          <script src="/bundle.js"></script>
          <script>
            document.getElementById('root').className = "";
          </script>
        </body>
      </html>
    `;
  }
  else {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
          <title>${config.HTML_TITLE}</title>

          <meta name="keywords" content="${config.KEYWORDS}"/>
          <meta name="description" content="${config.DESCRIPTION}"/>
          <meta property="og:description" content="${config.DESCRIPTION}"/>
          <meta property="og:image" content="${config.SOCIAL_IMAGE}"/>
          <meta property="article:publisher" content="${config.SOCIAL_URL_PUBLISHER}"/>
          <meta property="og:url" content="${config.SOCIAL_URL}"/>

          <link rel="icon" href="/media/icon.png" type="image/png" sizes="16x16"/>
          <link href="https://fonts.googleapis.com/css?family=Megrim|Raleway:400,700" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="/main.bundle.css"/>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
        </head>
        <body>
          <div id="root">${markup}</div>
          <script async src="/bundle.js"></script>
        </body>
      </html>
    `;
  }
}

module.exports = app;
