#TvrboReact

## Features
TvrboReact is a boilerplate that features the state of the art technologies from the React ecosystem. It provides out of the box support and examples for the following:

* **React**
* **Redux**
* **React Router 4**
<!--* **React i18Next** - Providing tools for template extraction, gettext files translation and more.-->
* **Webpack 2**
* **Webpack Dev Server**
* **Babel**
* **React Hot Loader 3**
* **Redux DevTools** - You need to install the <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd">Chrome browser extension</a>
* **Node 6-7**
* **ExpressJS**
* **ES6/JSX**
* **PostCSS**
* **Autoprefixer**
* **Mongoose**
* **Async / await**
* **Server-side rendering**
* **Decorators**
* **PM2**
* **makefile**

## Getting Started
Here's how you get started:

### Requirements
Make sure you have `node` and `npm` installed.

	brew install node


### Clone the Repository

	git clone https://github.com/TvrboPro/TvrboReact.git

### Install the dependences

	make install

<!-- Using the yeoman generator should install the dependencies automatically.-->

You should now be able to run `make info` and see the full list of commands available to you.

### Live development

	make dev

Then, go to `http://localhost:8080` in your browser and start developing with live reload/react hot loading!

### Build for production

	make build

Will package all the assets into the `public` folder.

### Server management (in production)

	make start

Will start the app and serve whatever is in the `public` folder. Stop it by hitting `Ctrl+C`. This is a good way to check the real performance of your app in production conditions.

**NOTE**: You will need to run `npm run build` first.

You can also use a process management tool like **[PM2](http://pm2.keymetrics.io/)**:

	npm run pm2:start

	# or
	npm run pm2:restart

	# or
	npm run pm2:stop


### Localization
#### Template extraction

	npm run po:extract

Will extract the strings contained within `t("Translatable text inside t(...)")` and will generate/update the necessary template files for translation.

For every supported language defined in `app/client.config.js`, a folder will be created on `app/locales/` with the templates inside `translation.json` and `translation.po` files.

**NOTE**: Only `app/locales/../translation.json` will be used by the server. The `.po` files are intended for non technical translators, and they need to be **compiled** back to the corresponding `json` file.

Running this command will not wipe existing strings. Contents that are no longer used will be moved to the `translation_old.json` file.

#### Compiling from a .po file

	npm run po:compile

Reads all the `.po` files inside `app/locales/<lang>/` and compiles their content into the corresponding `translate.json` file.

### Deploy to Heroku
To deploy the app to Heroku, follow these steps:

* [Download the Heroku toolbelt](https://toolbelt.heroku.com) and create a [Heroku account](https://www.heroku.com)
* Log in with `heroku login`
* Run `git init`
* Run `heroku create <APP_NAME>`
* Run `git push heroku master`
* Open `https://APP_NAME.herokuapp.com` in your browser

<!--### Project structure

	app
		action_creators   >  Action creators for Redux actions
		api               >  Implement here the API to interact with the database
		locales           >  Translation files
		media             >  Media files that will be copied to 'public/media' on run
		reducers          >  Implement the logic to create new states upon actions
		styles            >  Provide styling (Sass) for your components
		tests             >  Write your own tests here
		views             >  JSX components intended to be rendered as pages
		widgets           >  Smaller JSX components intended for encapsulation and reuse

		client.jsx        >  The entry point of the client JS
		client.config.js  >  Static JS settings
		server.jsx        >  The entry point of the server
		server.config.js  >  Dynamic settings not suitable for Webpack bundling
		routes.jsx        >  Define your URL routes here
		store.jsx         >  Create and manage the Redux Store here

	index.js             >  The start script for the server
	gulp.lang.js         >  Performs the translation template extraction and compilation
	webpack.*.config.js  >  Webpack development and production settings

	public               >  Folder where everything is packaged and served from-->
