import WebSocket from "ws";
import { log } from "./lib/util";

var wss = null;

export function initSocket(server) {
	wss = new WebSocket.Server({ server });

	log("WebSocket Server ready");
}

export function broadcastMessage(key, payload) {
	if (!wss) return;

	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ key, payload }));
		}
	});
}

// TEST MESSAGES

// setInterval(() => {
// 	broadcastMessage("timestamp", {timestamp: Date.now()})
// 	broadcastMessage("ignore-me", {timestamp: 0})
// }, 1000);
