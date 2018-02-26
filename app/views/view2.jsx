import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { CtnMaxWidth } from '../widgets/ctn';
import { Bold } from '../widgets/txt';

@connect(({ app }) => ({ app }))
class View2 extends Component {
	static propTypes = {
		app: PropTypes.object.isRequired
	}

	render() {
		return (
			<CtnMaxWidth max="1024px">
				<h2>View 2</h2>
				<pre>this.props.app = {JSON.stringify(this.props.app)}</pre>
				<p>	Click logo to go back to <Bold>View 1</Bold></p>
			</CtnMaxWidth>
		);
	}
}

export default View2;
