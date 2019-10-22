const Response_Functions = new (require("./response_functions"));

/**
 * @typedef Call
 * @property {string} did
 * @property {string} phone
 * @property {string} call_id
 * @property {string} real_did
 * @property {string} extension
 */

/**
 * @param {string} call_id 
 * @param {*} events
 */
const Call = function (call_id, events) {

	/** types
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
	 * @typedef data
	 * @property {string} type
	 * @property {string} data
	 */

	this.did = "";
	this.phone = "";
	this.call_id = "";
	this.real_did = "";
	this.extension = "";



	/**@type {object} */
	let request;

	/**
	 * @function read
	 * @param {[data]} data 
	 * @param {string} mode 
	 * @param {read_options} options 
	 * @returns {number}
	 */
	this.read = async function (massage, mode = "tap", options = {}) {

		let [response_txt, val_return] = Response_Functions.make_read_response(massage, mode, options);

		request.res.send(response_txt);

		await block_running();

		return request.req.query[val_return];
	};

	this.goToFolder = function (folder) {
		let response_txt = `go_to_folder=${folder}`;

		request.res.send(response_txt);
	};

	/**
	 * @param {[data]} data 
	 */
	this.id_list_message = function (data) {

		let response_txt = Response_Functions.make_id_list_message_response(data);

		request.res.send(response_txt);
	};
	
	this.credit_card = () => {
		// ...
	};

	this.routing_yemot = function (phone) {
		let response_txt = "routing_yemot=" + phone;

		request.res.send(response_txt);
	};

	this.routing = function () {
		//...
	};

	this.get_req_vals = function (req, res, next) {

		request = {
			req,
			res,
			next
		};

		this.did = request.req.query.ApiDID;
		this.phone = request.req.query.ApiPhone;
		this.real_did = request.req.query.ApiDID;
		this.call_id = request.req.query.ApiCallId;
		this.extension = request.req.query.ApiExtension;
	};

	const block_running = async function () {

		await new Promise((resolve) => {
			events.once(call_id, () => resolve());
		});
	};
};

module.exports = Call;