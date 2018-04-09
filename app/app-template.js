import config from "./config/server";

// PRODUCTION MARKUP TEMPLATE

var markupTemplate = `<!DOCTYPE html>
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
    <meta property="article:publisher" content="${
			config.SOCIAL_URL_PUBLISHER
		}"/>
    <meta property="og:url" content="${config.SOCIAL_URL}"/>

    <link rel="icon" href="/media/icon.png" type="image/png" sizes="16x16"/>
    <link rel="stylesheet" type="text/css" href="/main.bundle.css"/>

    <script>
      window.__INITIAL_STATE__ = {{INITIAL_STATE}}
    </script>
  </head>
  <body>
    <div id="root">{{MARKUP}}</div>
    <script async src="/bundle.js"></script>
  </body>
</html>
`;

// OVERRIDE WHEN IN DEVELOPMENT

if (config.DEBUG) {
	markupTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
    <title>${config.HTML_TITLE}</title>
    <style>
    .skip-fouc {
      opacity: 0;
    }
    </style>

    <script>
      window.__INITIAL_STATE__ = {{INITIAL_STATE}}
    </script>
  </head>
  <body>
    <div id="root" class="skip-fouc">{{MARKUP}}</div>
    <script src="/bundle.js"></script>
    <script>
      document.getElementById('root').className = "";
    </script>
  </body>
</html>
`;
}

const chunks = markupTemplate.split("{{MARKUP}}");

module.exports = {
	upperChunk: chunks[0],
	lowerChunk: chunks[1]
};
