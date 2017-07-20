import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { CtnMaxWidth } from '../widgets/ctn';
import { FontMegrim,Bold } from '../widgets/txt';

@connect(({ app }) => ({ app }))
class View2 extends Component {
	static propTypes = {
		app: PropTypes.object.isRequired
	}

	render() {
		return (
			<CtnMaxWidth max="1024px">
				<br/>
				<br/>
				<FontMegrim sizeClass="txt-xl">View 2</FontMegrim>
				<br/>
				<br/>
				<pre>this.props.app = {JSON.stringify(this.props.app)}</pre>
				<br/>
				<br/>
				<p>	Click logo to go back to <Bold>View 1</Bold></p>
			</CtnMaxWidth>
		);
	}
}

export default View2;
