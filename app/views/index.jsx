import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Container from '../widgets/container';
import Card from '../widgets/card';
import { Row, Col } from "../widgets/grid";

@connect(({ entries }) => ({ entries }))
class Index extends Component {
	static propTypes = {
		entries: PropTypes.array.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	render() {
		return (
			<Container id="index">
				<h2>Latest content</h2>
				<p>Below is a curated list of content provided by js.coach</p>
				<Row>
					{this.props.entries.map(entry => <Col xs={12} sm={6} md={4} key={entry._id}>
						<Card title={entry.name} image={entry.image} link={`/projects/${entry._id}`}>
							<p>{entry.description}</p>
						</Card>
					</Col>)}
				</Row>

			</Container>
		);
	}
}

export default Index;
