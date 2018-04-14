import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
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
							<Card image={"https://www.cryptocompare.com" + coin.ImageUrl} link={"/charts/" + coin.Symbol + "-USD"}>
								<Row middle="xs">
									<span className="coin-name">{coin.CoinName}</span>
								</Row>
								<Row className="price-row" center="xs" middle="xs">
									<Col xs={4}><span className="price">$ {this.props.prices[coin.Symbol].USD}</span></Col>
									<Col xs={4}><span className="price">€ {this.props.prices[coin.Symbol].EUR}</span></Col>
									<Col xs={4}><span className="price">฿ {parseFloat(this.props.prices[coin.Symbol].BTC).toFixed(6)}</span></Col>
								</Row>
								<Link to={"/charts/" + coin.Symbol + "-USD"}>
									<Row className="link-row" center="xs" middle="xs">
										<Col>
											<div className="link-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM456 96H344c-21.4 0-32.1 25.9-17 41l32.9 32.9-72 72.9-55.6-55.6c-4.7-4.7-12.2-4.7-16.9 0L96.4 305c-4.7 4.6-4.8 12.2-.2 16.9l28.5 29.4c4.7 4.8 12.4 4.9 17.1.1l82.1-82.1 55.5 55.5c4.7 4.7 12.3 4.7 17 0l109.2-109.2L439 249c15.1 15.1 41 4.4 41-17V120c0-13.3-10.7-24-24-24z"></path></svg></div>
											<div className="link-text">Price chart</div>
										</Col>
									</Row>
								</Link>
							</Card>
						</Col>)
					}
				</Row>
			</Container>
		);
	}
}

export default Tickers;
