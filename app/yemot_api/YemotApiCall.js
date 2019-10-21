const YemotApiFunctions = require("./YemotApiFunctions");
const functions = new YemotApiFunctions();

const YemotApiCall = function(call_id, event) {

	this.call_id = call_id;
	this.event = event;

	/**
	 * @typedef read_options
	 * @property {string} val_name
	 * @property {boolean} re_enter_if_exists
	 * @property {number} max
	 * @property {number} min
	 * @property {number} sec_wait
	 * @property {*} play_ok_mode
	 * @property {boolean} block_asterisk
	 * @property {boolean} allow_zero
	 * @property {string} replace_char
	 * @property {number[]} digits_allowed
	 * @property {number} amount_attempts
	 * @property {string} read_none_var
	 */
	/**
	 * @function read
	 * @param {*} data 
	 * @param {string} mode 
	 * @param {read_options} options 
	 * @returns {number}
	 */
	this.read = async function(data, mode = "tap", options = {}) {

		let {response_txt, val_return} = functions.make_read_response(data, mode, options);

		this.res.send(response_txt);

		await block_running();

		return val_return;
	};

	this.get_req_vals = function(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;
	};

	const block_running = async function() {

		await new Promise((resolve) => {
			this.event.once(this.call_id, () => resolve());
		});

	};

};

module.exports = YemotApiCall;

/* 
//module.exports = class YemotApiCall extends YemotApiFunctions {
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
 */