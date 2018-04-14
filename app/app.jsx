import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import { fetchAll } from "./lib/actions";

import Index from './views/index.jsx';
import Project from './views/project.jsx';
import Tickers from './views/tickers.jsx';
import NotFound from './views/not-found.jsx';

import Header from './widgets/header.jsx';
import Footer from './widgets/footer.jsx';
import ScrollBack from './widgets/scroll-back.jsx';

@withRouter
@connect(({ app }) => ({ app }))
class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    children: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  state = {
    width: 0
  }

  onAcceptCookies() {
    this.props.dispatch({ type: 'ACCEPT_COOKIES' });
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth.bind(this));

		// fetch the full list (descriptions and activity images)
		this.props.dispatch(fetchAll());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth.bind(this));
  }

  updateWindowWidth() {
    if (typeof document != 'undefined') {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      this.setState({ width: w });
    }
  }

  render() {
    return (
      <ScrollBack>
        <div id="app">

          <Header />

          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/projects/:id" exact component={Project} />
            <Route path="/tickers" component={Tickers} />
            <Route component={NotFound} />
          </Switch>

          <Footer />

          {/*<Cookies show={!this.props.app.cookiesAccepted} onAccept={() => this.onAcceptCookies()} />*/}

        </div>
      </ScrollBack>
    );
  }
}

export default App;
