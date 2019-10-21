const data_type = {

	"file": "f",
	"text": "t",
	"speech": "s",
	"digits": "d",
	"number": "n",
	"alpha": "a"
};

const YemotApiFunctions = function ()  {

	let value_num = 1;

	this.make_read_response = function(data, mode, options) {

		if (typeof data != "object") {
			throw new Error("Data is undefined");
		}

		if (!options.val_name) {

			options.val_name = "val_" + value_num;
			value_num++;
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
		return res, options.val_name;
	};

	this.goToFolder = function(folder) {
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
	this.id_list_message = function(data) {

		return "id_list_message=" + this._make_read_data(data);
	};

	this.credit_card = () => {
		// ...
	};

	this.routing_yemot = function(phone) {
		return "routing_yemot=" + phone;
	};

	this.routing = function() {
		//...
	};

	/**
	 * 
	 * private functions:
	 */

	const make_read_data = function(data) {

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

	const make_tap_mode_request = function(data_str, options) {

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