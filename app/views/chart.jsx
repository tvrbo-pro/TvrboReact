import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getPriceBars } from "../lib/api";
import { connect } from 'react-redux';

import Container from '../widgets/container';
import { Row, Col } from "../widgets/grid";
import Card from "../widgets/card";
import ChartWidget from "../widgets/chart";

@withRouter
@connect(({ coins }) => ({ coins }))
class ChartView extends Component {
    static propTypes = {
        coins: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    }

    state = {
        loading: false,
        error: null,
        bars: []
    }

    componentDidMount() {
        if (!this.props.match) return this.setState({ error: "Invalid pair" });

        this.setState({ loading: true });

        getPriceBars(this.props.match.params.pair)
            .then(data => {
                this.setState({
                    loading: false,
                    bars: data.map(item => ({
                        date: new Date(item.time),
                        low: item.low,
                        high: item.high,
                        open: item.open,
                        close: item.close,
                        volume: item.volumeto
                    }))
                });
                this.socketConnect();
            })
            .catch(err => {
                this.setState({ error: err.message, loading: false });
            });
    }
    componentWillUnmount() {
        this.socketDisconnect();
    }

    socketConnect() {
		const socketUrl = "ws://" + location.host + "/ws";
		this.ws = new WebSocket(socketUrl);
        this.ws.onopen = () => this.connected();
        this.ws.onmessage = ev => this.onMessage(ev);
        this.ws.onerror = ev => this.onError(ev);
        this.ws.onclose = ev => this.onClose(ev);
    }
    socketDisconnect() {
        if (this.ws) this.ws.close();
    }
    connected() {
        console.log("Socket Connected");
    }
    onMessage(ev) {
        if (!ev || !ev.data) return;
        try {
            const message = JSON.parse(ev.data);
            if (!message.payload || !message.payload.pair || message.payload.pair != this.props.match.params.pair) return;
            else if (message.key == "chart-new-bar") {
                const bars = this.state.bars.concat({
                    date: new Date(message.payload.currentBar.time),
                    low: message.payload.currentBar.low,
                    high: message.payload.currentBar.high,
                    open: message.payload.currentBar.open,
                    close: message.payload.currentBar.close,
                    volume: message.payload.currentBar.volumeto
                });
                this.setState({ bars });
            }
            else if (message.key == "chart-new-price") {
                const bars = this.state.bars.concat([]);
                bars[bars.length - 1] = {
                    date: new Date(message.payload.currentBar.time),
                    low: message.payload.currentBar.low,
                    high: message.payload.currentBar.high,
                    open: message.payload.currentBar.open,
                    close: message.payload.currentBar.close,
                    volume: message.payload.currentBar.volumeto
                };
                this.setState({ bars });
            }
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
            <Container id="chart">
                <h2>Price chart</h2>
                <p>This view uses websockets</p>

                {
                    this.state.bars && this.state.bars.length ? (
                        <Card title={this.props.match.params.pair + " (4h)"}>
                            <ChartWidget type="hybrid" data={this.state.bars} />
                        </Card>
                    ) : (
                        !this.state.loading ?
                            <Row middle="xs" center="xs">
                                <Col sm={8} md={6}>
                                    <Card>
                                        <p className="error-text">
                                            {this.state.error || "The price data is not yet available"}
                                        </p>
                                    </Card>
                                </Col>
                            </Row> : null
                    )
                }
            </Container>
        );
    }
}

export default ChartView;
