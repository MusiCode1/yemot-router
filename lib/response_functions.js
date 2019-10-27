
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
	
const data_type = {

	"file": "f",
	"text": "t",
	"speech": "s",
	"digits": "d",
	"number": "n",
	"alpha": "a"
};

const Response_Functions = function () {

	this.make_read_response = function (massage, mode, options, value_num = 1) {

		if (typeof massage != "object") {
			throw new Error("Data is undefined");
		}

		if (!options.val_name) {

			options.val_name = "val_" + value_num;
		}

		let data_str = make_read_data(massage);
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
		return [res, options.val_name];
	};

	this.make_id_list_message_response = function (data) {

		return "id_list_message=" + make_read_data(data);
	};

	const make_read_data = function (data) {

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

	const make_tap_mode_request = function (data_str, options) {

		let res = [
			`read=${data_str}=` +

			options.val_name,

			(options.re_enter_if_exists || false) ? "yes" : "no",

			(options.max || "*"),

			(options.min || "1"),

			(options.sec_wait || 7),

			(options.play_ok_mode || "Number"),

			(options.block_asterisk || false),

			(options.allow_zero || true),

			(options.replace_char || ""),

			options.digits_allowed ? options.digits_allowed.join(".") : "", // [1, 14]

			(options.amount_attempts || ""),

			(options.read_none_var || "")
		];

		return res.join(",");
	};
};

module.exports = Response_Functions;