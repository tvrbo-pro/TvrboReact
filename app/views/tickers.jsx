import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Container from '../widgets/container';
import { Row, Col } from "../widgets/grid";
import Card from "../widgets/card";

@connect(({ coins, prices }) => ({ coins, prices }))
class Tickers extends Component {
	static propTypes = {
		coins: PropTypes.array.isRequired,
		prices: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.socketConnect()
	}
	componentWillUnmount() {
		this.socketDisconnect();
	}

	socketConnect() {
		this.ws = new WebSocket('ws://localhost:8080/ws');
		this.ws.onopen = () => this.connected();
		this.ws.onmessage = ev => this.onMessage(ev);
		this.ws.onerror = ev => this.onError(ev);
		this.ws.onclose = ev => this.onClose(ev);
	}
	socketDisconnect() {
		this.ws.close();
	}
	connected() {
		console.log("Socket Connected");
	}
	onMessage(ev) {
		if (!ev || !ev.data) return;
		try {
			const message = JSON.parse(ev.data);
			if (message.key != "ticker") return;
			else if (!message.payload || !message.payload.symbol) return;

			const prices = Object.assign({}, this.props.prices);
			prices[message.payload.symbol] = message.payload.price;

			this.props.dispatch({ type: "SET", prices });
		}
		catch (err) {
			console.error("Invalid message from the server", err);
		}
	}
	onError(ev) {
		console.error("Socket Error", ev);
	}
	onClose(ev) {
		if (ev && !ev.wasClean) {
			setTimeout(() => this.socketConnect(), 5000);
		}
		console.log("Socket Closed", ev);
	}

	render() {
		return (
			<Container id="tickers">
				<h2>Price tickers</h2>
				<p>This view uses websockets</p>

				<Row>
					{
						this.props.coins.map(coin => <Col key={coin.Symbol} sm={6} md={4}>
							<Card title={coin.Name} image={"https://www.cryptocompare.com" + coin.ImageUrl}>
								<Row middle="xs">
									<span className="coin-name">{coin.CoinName}</span>
								</Row>
								<Row className="price-row" center="xs" middle="xs">
									<Col xs={4}><span className="price">$ {this.props.prices[coin.Symbol].USD}</span></Col>
									<Col xs={4}><span className="price">€ {this.props.prices[coin.Symbol].EUR}</span></Col>
									<Col xs={4}><span className="price">฿ {parseFloat(this.props.prices[coin.Symbol].BTC).toFixed(6)}</span></Col>
								</Row>
							</Card>
						</Col>)
					}
				</Row>
			</Container>
		);
	}
}

export default Tickers;
