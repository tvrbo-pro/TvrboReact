import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CtnMaxWidth } from '../widgets/ctn';

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
			<CtnMaxWidth max="1024px">
				<h2>Not Found</h2>
				<p>The page you requested does not exist</p>
			</CtnMaxWidth>
		);
	}
}

export default NotFound;
