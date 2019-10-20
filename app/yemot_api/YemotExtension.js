const YemotApiCall = require("./YemotApiCall");

module.exports = class YemotExtension {

	constructor() {
		this.active_calls = {};
	}


	async run(req, res, next, gen_fn) {

		let call_id = req.query.ApiCallId;

		let current_call = this._get_current_call(call_id, gen_fn);

		current_call.set_user_vars(req.query);

		let returned_key = current_call.get_return_value();

		let reply = await current_call.controller.next(returned_key);

		if (reply.done || req.query.Hangup) {
			this._remove_current_call(call_id);
		}

		return res.send(reply.value);
	}

	_get_current_call(call_id, gen_fn) {
		let current_call = this.active_calls[call_id];

		if (!current_call) {
			current_call = this.active_calls[call_id] = new YemotApiCall(gen_fn);
		}

		return current_call;
	}

	_remove_current_call(call_id) {
		delete this.active_calls[call_id];
	}
};
