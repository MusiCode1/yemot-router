
class Exit_error extends Error {
	constructor(call, ...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);

		this.call = call;

		this.name = "Exit_error";
		// Custom debugging information
		this.date = new Date();
	}
}

class Hangup_error extends Exit_error {
	constructor(...params) {
		super(...params);
		this.name = "Hangup_error";
	}
}

class Timeout_error extends Exit_error {
	constructor(...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);
		this.name = "Timeout_error";
	}
}

module.exports = {
	Hangup_error,
	Timeout_error,
	Exit_error
};