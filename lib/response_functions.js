const data_type = {

	"file": "f",
	"text": "t",
	"speech": "s",
	"digits": "d",
	"number": "n",
	"alpha": "a",
	"zmanim": "z",
	"go_to_folder": "g",
	"system_message": "m",
	"music_on_hold": "h",
	"date": "date",
	"dateH": "dateH"
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
			case "stt":
				res = make_stt_mode_request(data_str, options);
				break;
			case "record":
				res = make_record_mode_request(data_str, options);
				break;
			default:
				throw new Error("mode parameter is Invalid");
		}

		return [res, options.val_name];
	};

	this.make_id_list_message_response = function (data) {
		return "id_list_message=" + make_read_data(data) + "&";
	};

	function check_text(data) {
		const rgx = /[.\-"'&|]/g;
		for (const msg of data) {
			if (rgx.test(msg.data)) {
				throw new Error(`'${msg.data}' has invalid characters for yemot`);
			}
		}
	}

	const make_read_data = function (data) {
		check_text(data);
		let res = "";
		let i = 1;
		for (const value of data) {
			res += i > 1 ? "." : "";
			if (!value.type) {
				throw new Error(`in ${JSON.stringify(value)} type is missing!`);
			} else if (!data_type[value.type]) {
				throw new Error(`${value.type} is not a valid type!`);
			} else {
				res += data_type[value.type] + "-";
			}

			if (value.type === "zmanim") {
				if (typeof value.data !== "object") throw new Error("in \"zmanim\" type, data should be an object");
				let difference_splitted;
				if (value.data.difference) {
					if (!/(-|\+)[YMDHmSs]\d+/.test(value.data.difference)) throw new Error("difference is invalid");
					difference_splitted = value.data.difference.match(/(-|\+)(.+)/);
				}
				res += [
					value.data.time || "T",
					value.data.zone || "IL/Jerusalem",
					difference_splitted ? difference_splitted[1] : "",
					difference_splitted ? difference_splitted[2] : ""
				].join(",");
			} else if (value.type === "system_message") {
				const msgId = String(value.data).replace("M", "");
				if (!Number.isInteger(parseInt(msgId))) {
					throw new Error(`${value.data} is not a valid system message id!`);
				}
				res += msgId;
			} else {
				res += value.data;
			}
			i++;
			if (value.type === "go_to_folder") break;
		}
		return res;
	};

	const make_tap_mode_request = function (data_str, options) {
		const values = [
			options.val_name,
			(options.re_enter_if_exists || false) ? "yes" : "no",
			(options.max || "*"),
			(options.min || "1"),
			(options.sec_wait || 7),
			(options.play_ok_mode || "No"),
			(options.block_asterisk || false) ? "yes" : "no",
			(options.block_zero || false) ? "yes" : "no",
			(options.replace_char || ""),
			options.digits_allowed ? options.digits_allowed.join(".") : "", // [1, 14]
			(options.amount_attempts || ""),
			(options.read_none || false) ? "Ok" : "no",
			(options.read_none_var || ""),
			(options.block_change_type_lang ? "InsertLettersTypeChangeNo" : "")
		];
		return `read=${data_str}=${values.join(",")}`;
	};

	const make_stt_mode_request = function (data_str, options) {
		const values = [
			options.val_name,
			(options.re_enter_if_exists || false) ? "yes" : "no",
			"voice",
			(options.lang || ""),
			(options.allow_typing || false) ? "yes" : "no"
		];
		return `read=${data_str}=${values.join(",")}`;
	};

	const make_record_mode_request = function (data_str, options) {
		const values = [
			options.val_name,
			(options.re_enter_if_exists || false) ? "yes" : "no",
			"record",
			(options.path || ""),
			(options.file_name || ""),
			(options.record_ok === false) ? "no" : "yes",
			(options.record_hangup || false) ? "yes" : "no",
			(options.record_attach || false) ? "yes" : "no",
			(options.lenght_min || ""),
			(options.lenght_max || "")
		];
		return `read=${data_str}=${values.join(",")}`;
	};
};

module.exports = Response_Functions;