import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Notifications from 'react-notify-toast';

import View1 from './views/view1.jsx';
import View2 from './views/view2.jsx';
import NotFound from './views/NotFound.jsx';

import Header from './widgets/header.jsx';
import Footer from './widgets/footer.jsx';

@withRouter
@connect(({ app }) => ({ app }))
class App extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    children: React.PropTypes.object,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
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
      <div id="app">

        <Notifications />

        <Header />

        <Switch>
          <Route path="/" exact component={View1} />
          <Redirect from="/view2-old" to="/view2" />
          <Route path="/view2" component={View2} />
          <Route component={NotFound} />
        </Switch>

        <Footer />

        {/*<Cookies show={!this.props.app.cookiesAccepted} onAccept={() => this.onAcceptCookies()} />*/}

      </div>
    );
  }
}

export default App;
