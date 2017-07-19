import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="row-between">
        <Link to="/">
          <p>Logo</p>
        </Link>
        <div className="row-center">
          <NavLink to="/view2" activeClassName="active">
            View 2
          </NavLink>
          <NavLink to="/view2-old" activeClassName="active">
            Redirect to View 2
          </NavLink>
          <NavLink to="/does/not/exist" activeClassName="active">
            Not found
          </NavLink>
        </div>
      </header>
    );
  }
}

export default Header;
