const data_type = {

	"file": "f",
	"text": "t",
	"speech": "s",
	"digits": "d",
	"number": "n",
	"alpha": "a"
};

const YemotApiFunctions = () => {

	let value_num = 1;

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
	this.read = (data, mode = "tap", options = {}) => {

		if (typeof data != "object") {
			throw new Error("Data is undefined");
		}

		let data_str = make_read_data(data);
		let res;

		switch (mode) {
			case "tap":
				res = make_tap_mode_request(data_str, options);
				break;

			case "voice":
				//...
				break;

			case "rec":
				//...
				break;

			default:
				throw new Error("mode parameter is Invalid");

		}
		return res;
	};

	this.goToFolder = (folder) => {
		return `go_to_folder=${folder}`;
	};
	/**
	 * 
	 * @typedef data
	 * @property {string} type
	 * @property {string} data
	 */
	/**
	 * @param {[data]} data 
	 */
	this.id_list_message = (data) => {

		return "id_list_message=" + this._make_read_data(data);
	};

	this.credit_card = () => {
		// ...
	};

	this.routing_yemot = (phone) => {
		return "routing_yemot=" + phone;
	};

	this.routing = () => {
		//...
	};

	/**
	 * 
	 * private functions:
	 */

	const make_read_data = (data) => {

		let res = "";

		let i = 1;

		data.forEach((value) => {

			res += i > 1 ? "." : "";

			res += data_type[value.type] + "-";

			res += value.data;

			i++;
		});

		return res;
	};

	const make_tap_mode_request = (data_str, options) => {

		if (!options.val_name) {

			options.val_name = "val_" + value_num;
			value_num++;
		}

		let res = [
			`read=${data_str}=`,

			options.val_name,

			(options.re_enter_if_exists || false) ? "yes" : "no",

			(options.max || "*"),

			(options.min || "1"),

			(options.sec_wait || 7),

			(options.play_ok_mode || "Number"),

			(options.block_asterisk || true),

			(options.allow_zero || true),

			(options.replace_char || ""),

			options.digits_allowed ? options.digits_allowed.join(".") : "", // [1, 14]

			(options.amount_attempts || ""),

			(options.read_none_var || "")
		];

		return res.join(",");
	};
};

module.exports = YemotApiFunctions;