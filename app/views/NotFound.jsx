import React, { Component } from 'react';

class NotFound extends Component {
	static propTypes = {
		staticContext: React.PropTypes.object
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
