import config from './config/server';
import express from 'express';
import serveStatic from 'serve-static';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

import path from 'path';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'
import { renderToNodeStream } from 'react-dom/server';
import App from './app.jsx';
import { upperChunk, lowerChunk } from "./app-template.js";

import basicAuth from 'basic-auth';
import apiRouter from './api';
import { decodeAuth } from './lib/session';

import { makeInitialStore, dehydrate } from './store/server';

// SERVER LOGIC
var app = express();

// FAVICON
app.use(favicon(path.join(__dirname, 'media', 'favicon.ico')));

// HTTP AUTH?
if (config.HTTP_USER && config.HTTP_PASSWORD) {
  console.log((new Date()).toJSON() + " | " + config.APP_NAME + " using HTTP Auth", "\n");
  app.use((req, res, next) => {
    const credentials = basicAuth(req);

    if (!credentials || credentials.name !== config.HTTP_USER || credentials.pass !== config.HTTP_PASSWORD) {
      res.setHeader('WWW-Authenticate', `Basic realm="${config.APP_NAME}"`)
      res.status(401).end('Unauthorized');
    }
    else next();
  });
}

// STATIC FILES
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
    const markupStream = renderToNodeStream(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      return res.redirect(302, context.url);
    }
    else if (!markupStream) {
      return res.status(404).send('');
    }

    // RENDER
    const initialState = dehydrate(store);
    if (context.status) res.status(context.status);

    const topContent = upperChunk.replace("{{INITIAL_STATE}}", JSON.stringify(initialState));
    res.write(topContent);

    markupStream.pipe(res, { end: false });

    markupStream.on("end", () => {
      res.end(lowerChunk);
    })
  }
  catch (err) {
    console.error("SERVER RENDER ERROR:", err);
    res.status(500).send(err.message);
  }
});


module.exports = app;
