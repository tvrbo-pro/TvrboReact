import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// @connect(({ app }) => ({ app }))
class Header extends Component {
	static propTypes = {
		// app: PropTypes.object.isRequired
	}

	render() {
		return (
			<div id="header">
				<h3>Header</h3>
				<ul>
            <li><Link to="/">View 1</Link></li>
            <li><Link to="/view2">View 2</Link></li>
            <li><Link to="/view2-old">Redirect to View 2</Link></li>
            <li><Link to="/does/not/exist">Not found</Link></li>
          </ul>
			</div>
		);
	}
}

export default Header;
