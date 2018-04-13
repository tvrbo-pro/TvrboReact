import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Container from '../widgets/container';
import Card from '../widgets/card';
import { Row, Col } from "../widgets/grid";

@connect(({ posts }) => ({ posts }))
class View1 extends Component {
	static propTypes = {
		posts: PropTypes.array.isRequired
	}

	render() {
		return (
			<Container id="index">
				<h2>Latest content</h2>
				<Row>
					<Col xs={12} sm={6} md={4}>
						<Card title="This is the title" image="https://images.unsplash.com/photo-1520764816423-52375cbff016?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b12c35983ad53712ef4e331b59c08689&auto=format&fit=crop&w=2534&q=80"> Content goes here </Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Card> Content
						</Card>
					</Col>
				</Row>

			</Container>
		);
	}
}

export default View1;
