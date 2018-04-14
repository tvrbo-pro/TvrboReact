// CLIENT API

import axios from "axios";

// ENTRIES

export function getEntries() {
	return axios.get(`/api/entries`).then(response => {
		if (response && response.error) throw new Error(response.error);
		else return response.data;
	});
}

export function getPriceBars(pair) {
	return axios.get(`/api/price-bars/${pair}`).then(response => {
		if (response && response.error) throw new Error(response.error);
		else return response.data;
	});
}

// // SESSION

// export function getSession() {
// 	return axios.get(`/api/session`)
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }

// export function login(email, password, referer) {
// 	return axios.post(`/api/session`, { email, password, referer })
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }

// export function logout() {
// 	return axios.delete(`/api/session`)
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }

// // USER

// export function getUser() {
// 	return axios.get(`/api/users/me`)
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }

// export function signUp(params) {
// 	return axios.post(`/api/users`, params)
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }

// export function updateUser(params) {
// 	return axios.put(`/api/users/me`, params)
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }

// export function resetPassword(email) {
// 	return axios.put(`/api/users/password`, { email })
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }

// export function removeAccount() {
// 	return axios.delete(`/api/users/me`)
// 		.then(response => {
// 			if (response && response.error) throw new Error(response.error);
// 			else return response.data;
// 		})
// }
