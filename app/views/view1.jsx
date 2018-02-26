import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { CtnMaxWidth } from '../widgets/ctn';

@connect(({ app }) => ({ app }))
class View1 extends Component {
	static propTypes = {
		app: PropTypes.object.isRequired
	}

	render() {
		return (
			<CtnMaxWidth max="1024px">
				<h2>View 1</h2>
				<pre>this.props.app = {JSON.stringify(this.props.app)}</pre>
			</CtnMaxWidth>
		);
	}
}

export default View1;
