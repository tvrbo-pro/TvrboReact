import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Container from "./container";

class Header extends Component {
  render() {
    return (
      <header>
        <Container id="header">
          <NavLink to="/" exact={true} activeClassName="active">
            <span className="title">Tvrbo React</span>
          </NavLink>
          <NavLink to="/tickers" exact={true} activeClassName="active">
            Tickers
          </NavLink>
          <NavLink to="/does/not/exist" exact={true} activeClassName="active" style={{float: "right"}}>
            [404]
          </NavLink>
          {/* <NavLink to="/profile" exact={true} activeClassName="active">
            Profile
          </NavLink> */}
        </Container>
      </header>
    );
  }
}

export default Header;
