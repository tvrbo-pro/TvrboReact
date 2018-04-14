import { expect } from "chai";
import request from "supertest";

import server from "../../app/server.jsx";

const agent = request.agent(server);

// api routes

// get /api/user
// get /api/session
// post /api/session/logout
// post /api/session/login
// post /api/user
// put /api/user/me
// delete /api/user/me

// DB

async function cleanDatabase() {
	console.log("      Cleaning the DB");

	// Your code here
}

// RUN

export default function() {
	describe("USER", function() {
		before(function() {
			return cleanDatabase();
		});

		describe("Anonymous calls", function() {
			it("get user should redirect to login (403)", function() {
				return agent
					.get("/api/users/me")
					.expect(403, { url: "/login" })
					.expect("Content-Type", /json/);
			});

			it("get session should redirect to login (403)", function() {
				return agent
					.get("/api/session")
					.expect(403, { url: "/login" })
					.expect("Content-Type", /json/);
			});

			it("update should redirect to login (403)", function() {
				return agent
					.put("/api/users/me")
					.expect(403, { url: "/login" })
					.expect("Content-Type", /json/);
			});

			it("delete should redirect to login (403)", function() {
				return agent
					.delete("/api/users/me")
					.expect(403, { url: "/login" })
					.expect("Content-Type", /json/);
			});
		});

		describe("Register", function() {
			it("should complain about empty data", function() {
				return agent
					.post("/api/users")
					.send({
						email: "",
						name: "" // ...
					})
					.expect(200, { error: "..." })
					.expect("Content-Type", /json/);
			});

			it("should complain about existing account", function() {
				return agent
					.post("/api/users")
					.send({
						email: "email@user.net",
						password: "password"
						// ...
					})
					.expect(200, { error: "already registered" })
					.expect("Content-Type", /json/);
			});
		});

		describe("Log in", function() {
			it("should complain about empty data", function() {
				return agent
					.post("/api/session")
					.send({
						email: "",
						password: ""
					})
					.expect(200, { error: "nope" })
					.expect("Content-Type", /json/);
			});

			it("should complain about invalid data", function() {
				return agent
					.post("/api/session")
					.send({
						email: "email@user.net",
						password: "invalidPassword"
					})
					.expect(200, { error: "nope" })
					.expect("Content-Type", /json/);
			});

			it("should accept a valid login", function() {
				return agent
					.post("/api/session")
					.send({
						email: "email@user.net",
						password: "password"
					})
					.expect(200)
					.expect("Content-Type", /json/)
					.then(function(res) {
						expect(res.body.error).to.not.be.ok;

						expect(res.body.user).to.be.ok;
						expect(res.body.user._id).to.be.ok;
						expect(res.body.user.email).to.equal("email@user.net");
						expect(res.body.user.estat).to.equal("pendent");
					});
			});

			it("should accept our cookie (user)", function() {
				return agent
					.get("/api/users/me")
					.expect(200)
					.expect("Content-Type", /json/)
					.then(function(res) {
						expect(res.body).to.be.ok;
						expect(res.body._id).to.be.ok;
						expect(res.body.email).to.equal("email@user.net");
						expect(res.body.estat).to.equal("pendent");
					});
			});

			it("should accept our cookie (session)", function() {
				return agent
					.get("/api/session")
					.expect(200)
					.expect("Content-Type", /json/)
					.then(function(res) {
						expect(res.body.user).to.be.ok;
						expect(res.body.user._id).to.be.ok;
						expect(res.body.user.email).to.equal("email@user.net");
						expect(res.body.user.estat).to.equal("pendent");
					});
			});

			it("nick should activate us", function() {
				return agent
					.put("/api/users/me")
					.send({
						// ...
					})
					.expect(200)
					.expect("Content-Type", /json/)
					.then(function(res) {
						expect(res.body).to.be.ok;
						expect(res.body._id).to.be.ok;
						expect(res.body.email).to.equal("email@user.net");
						expect(res.body.estat).to.equal("actiu");
					});
			});

			it("should log out", function() {
				return agent
					.delete("/api/session")
					.expect(200, {})
					.expect("Content-Type", /json/);
			});

			it("get user should redirect again to login (403)", function() {
				return agent
					.get("/api/users/me")
					.expect(403, { url: "/login" })
					.expect("Content-Type", /json/);
			});
		});
	});
}
