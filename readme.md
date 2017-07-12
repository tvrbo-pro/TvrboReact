# TvrboReact

## Features
TvrboReact is a clean, concise and easy to understand a JS starter project. It features the state of the art technologies from the React ecosystem, providing support for:

* **React**
* **Redux** + **Redux Thunk**
* **React Router 4** (with scroll history management)
* **Webpack 2** (Tree Shaking)
* **Webpack Dev Server**
* **React Hot Loader 3**
* **Server side rendering** (Universal)
* **Mocha, Chai, Supertest**
* **Session management** (Cookies + JSON Web Tokens)
* **React Media** (Media queries within React)
* **React Notify Toast**
* **Babel** (ES6, JSX, decorators, async/await)
* **PostCSS** (CSS Next, autoprefixer)
* **ESLint**
* **ExpressJS**
* **Mongoose**
* **Nodemailer**
* **PM2**
* **makefile** (development and server tasks)

## Getting Started
Here's how you get started:

### Requirements
Make sure you have NodeJS 7.6 or newer installed.

	brew install node

### Clone the Repository

	git clone https://github.com/TvrboPro/TvrboReact.git

You should now be able to run `make info` and see the full list of commands available to you.

### Install the dependences

	make install

This will also perform an initial build.

### Live development

	make dev

Then, go to `http://localhost:8080` in your browser and start developing with live reload/react hot loading!

### Production build

	make build

Will package all the assets into the `public` folder.

	make run

Will start the app and serve whatever is in the `public` folder. Stop it by hitting `Ctrl+C`. This is a good way to check the real performance of your app in production conditions.

### App management (in a server)

You may want to use a process management tool like **[PM2](http://pm2.keymetrics.io/)**.

Edit `process.yml` to set your project name, execution mode, etc. Four utility tasks are defined:

	make start
	make reload
	make restart
	make stop

## Coding

### Decorators

To access content in your Redux stores, connect your React components

	@connect({user, products} => {user, products})
	class View extends Component {
		...
	}

If a component uses `Route`, `Switch` or any route-aware component from **React Router**:

	@withRouter
	class View extends Component {
		...
	}

If you were to use both, leave `@withRouter` as the first decorator.


### Configuration

Though Webpack handles ES6 modules by only bundling what's imported instead of the whole module, it may not be a good idea to use a single config file for the server and the client. That's why both are split into separate files and must be included accordingly.

**Server only code** may import `app/config/server.js` and `app/config/client.js` and use any of its values.

However, **files bundled by Webpack** should only import values from `app/config/client`. Otherwise, execution will throw an error to prevent that you bundle and leak any API keys or other secret data.

Usage:

	import config from 'app/config/server';
	// ...
	console.log(config.HTTP_PORT);


	import appConfig from 'app/config/client';
	// ...
	console.log(appConfig.APP_NAME);


#### Priority

The client version will export the raw data in `app/config.client.js`.

The server config will look for any key defined in `app/config/server-*.js`. If an environment variable (prefixed or not) with the same name is defined, it will override the static value.

See `app/config/server.js` for more details.

#### Defaults

* In development, Webpack Dev Server exposes the port `8080`, acting as a proxy to the NodeJS server (port `3000`)
* Otherwise, NodeJS listens on port `8080` when you start it with `make run`
* The database is disabled. To enable MongoDB, edit `app/config/server-*.js` and comment/uncomment the `MONGODB_URI` and `MONGODB_TEST_URI` variables accordingly.

### Testing

Run `make test` and let the magic happen. This will provide you detailed information in case of failure. To get a cleaner summary, you may run `make check` instead.

### Utilities

* You can use `test/populate.js` to add your code for sample data creation in your database. Run it with `make populate`.
* You can use `test/wipe.js` to clean any data in your local database and repopulate it again. Use `make wipe` for this.
* Use `make todo` to highlight any pending changes you might have commented in your code

<!--
### Localization
#### Template extraction

	make po:extract

Will extract the strings contained within `t("Translatable text inside t(...)")` and will generate/update the necessary template files for translation.

For every supported language defined in `app/client.config.js`, a folder will be created on `app/locales/` with the templates inside `translation.json` and `translation.po` files.

**NOTE**: Only `app/locales/../translation.json` will be used by the server. The `.po` files are intended for non technical translators, and they need to be **compiled** back to the corresponding `json` file.

Running this command will not wipe existing strings. Contents that are no longer used will be moved to the `translation_old.json` file.

#### Compiling from a .po file

	make po:compile

Reads all the `.po` files inside `app/locales/<lang>/` and compiles their content into the corresponding `translate.json` file.-->

### Project structure

	app
		api               >  Implement here the API to interact with the database
		config            >  Client/server settings, development/production.
		lib
			actions.js      >  Action creators
			api.js          >  Client side api wrappers
			session.js      >  Manage user sessions (check login, decode payload, etc)
			...             (your own utilities)

		mail              >  Mailing utilities with builtin image attachments
		media             >  Media files that will be copied to 'public/media' on run
		models            >  Your Mongoose data models
		reducers          >  Implement the logic to create new states upon actions
		store             >  Redux store creation and composition
		styles            >  Provide styling for your components
		views             >  JSX components intended to be used as pages
		widgets           >  Smaller JSX components intended for encapsulation and reuse

		app.jsx           >  The root component (define your main routes here)
		client.jsx        >  The entry point of the client render
		server.jsx        >  The entry point of the server render

	test
		index.js           >  The test runner
		tests              >  Write your own tests here
		populate.js        >  (Utility) Populate sample content (DB)
		wipe.js            >  (Utility) Remove DB contents

	index.js             >  The start script for the server
	makefile             >  Tasks definition
	process.yml          >  PM2 config file
	webpack.*.config.js  >  Webpack development and production settings

	public               >  Folder where everything is packaged and served from

### Deploy to Heroku
To deploy the app to Heroku, follow these steps:

* [Download the Heroku toolbelt](https://toolbelt.heroku.com) and create a [Heroku account](https://www.heroku.com)
* Log in with `heroku login`
* Run `git init`
* Run `heroku create <APP_NAME>`
* Run `git push heroku master`
* Open `https://APP_NAME.herokuapp.com` in your browser
