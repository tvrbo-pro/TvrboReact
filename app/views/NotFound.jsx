import React, { Component } from 'react';

class NotFound extends Component {
	static propTypes = {
		// params: React.PropTypes.object
	}

	render() {
		return (
			<div id="not-found">
				<h3>Not Found</h3>
				<p>The page you requested does not exist</p>
			</div>
		);
	}
}

export default NotFound;
