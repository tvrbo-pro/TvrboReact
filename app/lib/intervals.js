global.fetch = require("node-fetch");
import Promise from "bluebird";
import cc from "cryptocompare";
import { broadcastMessage } from "../socket";

// STATE
var coins = [];
var prices = {}; // key-value object
var lastError = null;

// INIT

export function initIntervals() {
	setInterval(fetchPrices, 1000 * 10);

	fetchCoins()
		.then(() => fetchPrices())
		.catch(err => console.error("Cryptocompare request failed", err));
}

export function getState() {
	return {
		coins,
		prices
	};
}

function fetchCoins() {
	return cc
		.coinList()
		.then(response => {
			const keys = Object.keys(response.Data);
			coins = keys
				.sort((k1, k2) => {
					return (
						parseInt(response.Data[k1].SortOrder) -
						parseInt(response.Data[k2].SortOrder)
					);
				})
				.slice(0, 50)
				.map(k => Object.assign({}, response.Data[k], { Price: [] }));
		})
		.catch(err => {
			if (err.message == lastError) return;
			lastError = err.message;
			console.error("Cryptocompare coinList failed:", err);
		});
}

function fetchPrices() {
	Promise.map(coins, coin => {
		return cc
			.price(coin.Symbol, ["USD", "EUR", "BTC"])
			.then(lastPrice => {
				if (!lastPrice || !lastPrice.BTC) return;
				if (prices[coin.Symbol]) {
					if (
						prices[coin.Symbol].USD != lastPrice.USD ||
						prices[coin.Symbol].EUR != lastPrice.EUR ||
						prices[coin.Symbol].BTC != lastPrice.BTC
					) {
						broadcastMessage("ticker", {
							symbol: coin.Symbol,
							price: lastPrice
						});
					}
				}
				prices[coin.Symbol] = lastPrice;
			})
			.catch(err => {
				if (err.message == lastError) return;
				lastError = err.message;
				console.error("Cryptocompare price failed:", err);
			});
	}).catch(err => {
		if (err.message == lastError) return;
		lastError = err.message;
		console.error("Cryptocompare fetchPrices failed:", err);
	});
}
