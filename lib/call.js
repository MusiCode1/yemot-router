const Response_Functions = new (require("./response_functions"));

function Call(call_id, events) {

	this.did = "";
	this.phone = "";
	this.call_id = "";
	this.real_did = "";
	this.extension = "";

	let url_value_num = 0;

	let request;
	let global_response_txt = "";

	this.read = async function read(massage, mode = "tap", options = {}) {

		let response_txt, val_return, hangup;

		const send = async () => {

			if (!options.val_name) url_value_num++;

			[response_txt, val_return] = Response_Functions.make_read_response(massage, mode, options, url_value_num);

			if (global_response_txt) {
				response_txt = global_response_txt + response_txt;
				global_response_txt = "";
			}

			await wait_to_request();

			this.send(response_txt);

			hangup = await block_running(val_return);

			if (!request.req.query[val_return] && !hangup) {
				await send();
			}
		};

		await send();

		if (request.req.query[val_return]) {

			return {
				data: request.req.query[val_return],
				hangup
			};
		} else {
			return {
				data: false,
				hangup
			};
		}
	};

	this.go_to_folder = function go_to_folder(folder) {
		let response_txt = `go_to_folder=${folder}`;

		if (global_response_txt) {
			response_txt = global_response_txt + response_txt;
			global_response_txt = "";
		}

		this.send(response_txt);
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
	 * @param {[data]} data 
	 */
	this.id_list_message = async function id_list_message(data, wait_to_more_action = false) {

		let response_txt = Response_Functions.make_id_list_message_response(data);

		if (!wait_to_more_action) {
			// אם הפונקציה נקראה, לפני שהמשתמש ביקש תגובה
			await wait_to_request();

			this.send(response_txt);
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

		request = {
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

		const promise = new Promise((resolve) => {

			events.once(call_id, (hangup) => {
				console.log(val_return, "free");

				resolve(hangup);
			});

			console.log(val_return, "create block");
		});

		return await promise;
	};

	async function wait_to_request() {
		if (request.res._headerSent) {
			await block_running();
		}
	}

	return this;
}

module.exports = Call;