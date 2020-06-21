const Response_Functions = new (require("./response_functions"));

const call_values = {
	did: "ApiDID",
	phone: "ApiPhone",
	real_did: "ApiRealDID",
	call_id: "ApiCallId",
	extension: "ApiExtension"
};

function Call(call_id, events) {

	this.did = "";
	this.phone = "";
	this.call_id = "";
	this.real_did = "";
	this.extension = "";

	this.user_vals = {};

	let url_value_num = 0;

	/**@type {Request} */
	let request;

	/**
	 * @function read
	 * @param {[data]} massage 
	 * @param {string} mode 
	 * @param {read_options} options
	 * @returns {number}
	 */
	this.read = async function read(massage, mode = "tap", options = {}) {

		let response_txt, val_return;

		async function send() {

			if (!options.val_name) url_value_num++;

			[response_txt, val_return] = Response_Functions.make_read_response(massage, mode, options, url_value_num);

			request.res.send(response_txt);

			await block_running(val_return);

			if (!request.req.query[val_return]) {
				await send();
			}

		}

		await send();

		return request.req.query[val_return];
	};

	this.go_to_folder = function go_to_folder(folder) {
		let response_txt = `go_to_folder=${folder}`;

		request.res.send(response_txt);
	};

	this.restart_ext = function restart_ext() {
		const folder = this.extension;
		let response_txt = `go_to_folder=/${folder}`;

		request.res.send(response_txt);
	};

	/**
	 * @param {[data]} data 
	 */
	this.id_list_message = function id_list_message(data) {

		let response_txt = Response_Functions.make_id_list_message_response(data);

		request.res.send(response_txt);
	};

	this.credit_card = () => {
		// ...
	};

	this.routing_yemot = function routing_yemot(phone) {
		let response_txt = "routing_yemot=" + phone;

		request.res.send(response_txt);
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
		
	};

	const block_running = async function block_running(val_return) {


		const promise = new Promise((resolve) => {

			events.once(call_id, () => {
				console.log(val_return, "free");
				
				resolve();
			});

			console.log(val_return, "create block");
		});

		await promise;
	};

	return this;
}

module.exports = Call;