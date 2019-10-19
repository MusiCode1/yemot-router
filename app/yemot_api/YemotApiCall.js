const YemotApiFunctions = require("./YemotApiFunctions");
/**
 * @typedef {YemotApiCall}
 */
module.exports = class YemotApiCall extends YemotApiFunctions {
	constructor(callHandler) {
		super();
		this.controller = callHandler(this);
	}

	get_return_value() {
		if (this.expect && this.query[this.expect]) {
			let r = this.query[this.expect];
			this.expect = null;
			return r;
		} else {
			return null;
		}
	}

	set_user_vars(query) {
		if (
			!query.ApiCallId ||
			!query.ApiPhone ||
			!query.ApiDID ||
			!query.ApiRealDID ||
			!query.ApiExtension
		) {
			throw new Error("Missing parameters");
		}

		this.ApiCallId = query.ApiCallId;
		this.ApiPhone = query.ApiPhone;
		this.ApiDID = query.ApiDID;
		this.ApiRealDID = query.ApiRealDID;
		this.ApiExtension = query.ApiExtension;
		this.query = query;

		if (query.ApiEnterID) {
			this.ApiEnterID = query.EnterID;
		}

		if (query.ApiEnterIDName) {
			this.ApiEnterIDName = query.EnterIDName;
		}

		if (query.hangup) {
			this.hangup = query.hangup;
		}
	}
};
