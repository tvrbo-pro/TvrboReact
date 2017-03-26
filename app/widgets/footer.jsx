import React, { Component, PropTypes } from 'react';

class Footer extends Component {
	static propTypes = {
		app: PropTypes.object.isRequired
	}

	render() {
		return (
			<footer>
				<h5>Footer</h5>
			</footer>
		);
	}
}

export default Footer;
