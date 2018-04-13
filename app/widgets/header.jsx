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
          <NavLink to="/view2" activeClassName="active">
            View 2
          </NavLink>
          <NavLink to="/view2-old" activeClassName="active">
            Redirect to View 2
          </NavLink>
          <NavLink to="/does/not/exist" activeClassName="active">
            Not found
          </NavLink>
        </Container>
      </header>
    );
  }
}

export default Header;
