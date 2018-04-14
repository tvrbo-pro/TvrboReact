import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import Container from "./container";

class Header extends Component {
  render() {
    return (
      <header>
        <Container id="header">
          <NavLink to="/" activeClassName="active">
            <span className="title">Tvrbo React</span>
          </NavLink>
          <NavLink to="/tickers" activeClassName="active">
            Tickers
          </NavLink>
          <NavLink to="/does/not/exist" activeClassName="active">
            Not found
          </NavLink>
          <NavLink to="/view2-old" activeClassName="active" style={{float: "right"}}>
            Profile
          </NavLink>
        </Container>
      </header>
    );
  }
}

export default Header;
