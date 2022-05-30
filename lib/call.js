const Response_Functions = new (require("./response_functions"));
const { Hangup_error, Timeout_error, Exit_error } = require("./errors.js");

function Call(call_id, events, timeout) {

	this.did = "";
	this.phone = "";
	this.call_id = "";
	this.real_did = "";
	this.extension = "";

	let url_value_num = 0;

	let request;
	let global_response_txt = "";

	const _this = this;

	this.read = async function read(massage, mode = "tap", options = {}) {

		if (!Array.isArray(massage)) {
			throw new Error("data is not array!!");
		}

		let response_txt, val_return;

		const send = async () => {

			if (!options.val_name) url_value_num++;

			[response_txt, val_return] = Response_Functions.make_read_response(massage, mode, options, url_value_num);

			if (global_response_txt) {
				response_txt = global_response_txt + response_txt;
				global_response_txt = "";
			}

			await wait_to_request();

			this.send(response_txt);

			await block_running(val_return);

			if (!request.req.query[val_return]) {
				await send();
			}
		};

		await send();

		if (request.req.query[val_return]) {

			return request.req.query[val_return];

		} else {
			return false;
		}
	};

	this.go_to_folder = function go_to_folder(folder) {
		let response_txt = `go_to_folder=${folder}`;

		if (global_response_txt) {
			response_txt = global_response_txt + response_txt;
			global_response_txt = "";
		}

		this.send(response_txt);

		throw new Exit_error(_this);
	};

	this.restart_ext = function restart_ext() {
		const folder = this.extension;
		let response_txt = `go_to_folder=/${folder}`;

		if (global_response_txt) {
			response_txt = global_response_txt + response_txt;
			global_response_txt = "";
		}

		this.send(response_txt);
	};

	/**
	 * @param {[data]} massage 
	 */
	this.id_list_message = async function id_list_message(massage, wait_to_more_action = false) {

		if (!Array.isArray(massage)) {
			throw new Error("data is not array!!");
		}

		let response_txt = Response_Functions.make_id_list_message_response(massage);

		if (!wait_to_more_action) {
			// אם הפונקציה נקראה, לפני שהמשתמש ביקש תגובה
			await wait_to_request();

			this.send(response_txt);

			throw new Hangup_error(_this);
		} else {
			global_response_txt = response_txt;
		}
	};

	this.credit_card = () => {
		// ...
	};

	this.routing_yemot = function routing_yemot(phone) {
		let response_txt = "routing_yemot=" + phone;

		if (global_response_txt) {
			response_txt = global_response_txt + response_txt;
			global_response_txt = "";
		}

		this.send(response_txt);
	};

	this.routing = function () {
		//...
	};

	this.get_req_vals = function get_req_vals(req, res, next) {

		const request = {
			req,
			res,
			next
		};

		Object.assign(this, request.req.query);

		this.did = this.ApiDID;
		this.phone = this.ApiPhone;
		this.call_id = this.ApiCallId;
		this.real_did = this.ApiRealDID;
		this.extension = this.ApiExtension;

		this.query = request.req.query;
	};

	this.send = function send(data) {

		request.res.send(data);
		request.res.is_sending = true;

	};

	const block_running = async function block_running(val_return = undefined) {

		return new Promise((resolve, reject) => {

			events.once(call_id, (is_hangup) => {
				console.log(val_return, "free");

				if (timeout) {
					setTimeout(() => {
						on_timeout(reject);
					}, timeout);
				}

				if (is_hangup) {
					on_hangup(reject);

				} else {
					resolve(is_hangup);
				}
			});

			console.log(val_return, "create block");
		});
	};

	async function wait_to_request() {
		if (request.res._headerSent) {
			await block_running();
		}
	}

	return this;

	function on_hangup(reject) {

		request.res.json({ message: "hangup" });
		reject(new Hangup_error(_this));
	}

	function on_timeout(reject) {
		request.res.json({ message: "timeout" });
		reject(new Timeout_error(_this));
	}
}

module.exports = Call;