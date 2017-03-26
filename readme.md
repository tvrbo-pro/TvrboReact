#TvrboReact

## Features
TvrboReact is an easy to understand boilerplate, featuring the state of the art technologies from the React ecosystem. It provides out of the box support for:

* **React**
* **Redux** and **Redux Thunk**
* **React Router 4**
* **Webpack 2** (Tree Shaking)
* **Webpack Dev Server**
* **React Hot Loader 3**
* **Server side rendering** (Universal)
* **Mocha, Chai, Supertest**
* **Session + JSON Web Tokens**
* **React Media** (Media queries)
* **React Notify Toast**
* **Babel**
* **Decorators**
* **PostCSS**
* **Css Next**
* **Redux DevTools** - You need to install the <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd">Chrome browser extension</a>
* **ExpressJS**
* **Mongoose**
* **Nodemailer**
* **PM2**
* **makefile** tasks

## Getting Started
Here's how you get started:

### Requirements
Make sure you have `node` 7.6 or newer installed.

	brew install node

### Clone the Repository

	git clone https://github.com/TvrboPro/TvrboReact.git

### Install the dependences

	make install

You should now be able to run `make info` and see the full list of commands available to you.

### Live development

	make dev

Then, go to `http://localhost:8080` in your browser and start developing with live reload/react hot loading!

By default, the database is disabled. If you want to enable it, open `app/config/server-default.js` and comment/uncomment the `MONGODB_URI` and `MONGODB_TEST_URI` variables accordingly.

### Build for production

	make build

Will package all the assets into the `public` folder.

### Server management (in production)

	make start

Will start the app and serve whatever is in the `public` folder. Stop it by hitting `Ctrl+C`. This is a good way to check the real performance of your app in production conditions.

**NOTE**: You will want to run `make build` first.

You can also use a process management tool like **[PM2](http://pm2.keymetrics.io/)**:

	make start

	# or
	make reload

	# or
	make restart

	# or
	make stop

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

### Deploy to Heroku
To deploy the app to Heroku, follow these steps:

* [Download the Heroku toolbelt](https://toolbelt.heroku.com) and create a [Heroku account](https://www.heroku.com)
* Log in with `heroku login`
* Run `git init`
* Run `heroku create <APP_NAME>`
* Run `git push heroku master`
* Open `https://APP_NAME.herokuapp.com` in your browser

## Project structure

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
