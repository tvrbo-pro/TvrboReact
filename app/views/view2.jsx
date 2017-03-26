import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(({ app }) => ({ app }))
class View2 extends Component {
	static propTypes = {
		app: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				<h3>View 2</h3>
				<pre>this.props.app = {JSON.stringify(this.props.app)}</pre>
			</div>
		);
	}
}

export default View2;
