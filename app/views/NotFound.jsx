import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../widgets/container';

class NotFound extends Component {
	static propTypes = {
		staticContext: PropTypes.object
	}

	render() {
		if (this.props.staticContext) {
			// Tell the server
			this.props.staticContext.status = 404;
		}

		return (
			<Container>
				<h2>Not Found</h2>
				<p>The page you requested does not exist</p>
			</Container>
		);
	}
}

export default NotFound;
