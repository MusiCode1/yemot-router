
class Hangup_error extends Error {
	constructor(call, ...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);

		this.call = call;

		this.name = "Hangup_error";
		// Custom debugging information
		this.date = new Date();
	}
}

class Timeout_error extends Error {
	constructor(call, ...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);

		this.call = call;
	}
}

Hangup_error.Hangup_error = Hangup_error;

module.exports = {
	Hangup_error,
	Timeout_error
};