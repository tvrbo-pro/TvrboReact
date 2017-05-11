import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NotFound extends Component {
	static propTypes = {
		staticContext: PropTypes.object
	}

	render() {
		if(this.props.staticContext){
			// Tell the server
			this.props.staticContext.status = 404;
		}

		return (
			<div id="not-found">
				<h3>Not Found</h3>
				<p>The page you requested does not exist</p>
			</div>
		);
	}
}

export default NotFound;
