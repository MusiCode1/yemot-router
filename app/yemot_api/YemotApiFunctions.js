/*
	המודול הזה, מכיל את המודול הבסיסי עם הפונקציות לתקשר עם ימות
*/

const default_options = {

	//all
	val_name: undefined,

	//tapp
	re_enter_if_exists: false,
	max: "*",
	min: 1,
	sec_wait: 7,
	play_ok_mode: "Number",
	block_asterisk: true,
	allow_zero: true,
	replace_char: "**",
	digits_allowed: undefined, // ['1', '14']
	amount_attempts: undefined, // 1
	read_none: false,
	read_none_var: undefined,

	//voice
	lang: "he-IL",
	allow_tap: false,

	//rec
	record_folder_move: undefined,
	record_file_name: undefined,
	record_ok: true,
	record_hangup_save: false,
	record_attach: false
};

const default_options_keys = Object.keys(default_options);

const data_type = {

	"file":"f",
	"text":"t",
	"speech":"s",
	"digits":"d",
	"number":"n",
	"alpha":"a"
};

module.exports = class YemotApiFunctions {
    
	constructor() {

		this.value_num = 1;
	}
	/**
	 * 
	 * @typedef read_options
	 * @property {string} val_name
	 */
	/**
	 * 
	 * @param {*} data 
	 * @param {*} mode 
	 * @param {read_options} options 
	 */
	read(data, mode = "tap", options = {}) {

		options = this._make_read_options(options);
		
		if(typeof data != "object") {
			throw new Error("Data is undefined");
		}

		let data_str = this._make_read_data(data);

		let res;

		switch(mode) {

		case "tap":
			res = this._make_tap_mode_result(data_str, options);
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
		
		this.expect = options.val_name;
		return res;
	}

	goToFolder(folder) {
		return `go_to_folder=${folder}`;
	}
	/**
	 * 
	 * @typedef data
	 * @property {string} type
	 * @property {string} data
	 */
	/**
	 * 
	 * @param {[data]} data 
	 */
	id_list_message(data) {

		return "id_list_message=" + this._make_read_data(data);
	}

	credit_card() {
		// ...
	}

	routing_yemot(phone) {
		return "routing_yemot=" + phone;
	}

	routing() {
		//...
	}

	// === === === === === === === === === === === === === ===
	
	_make_read_options(options) {

		default_options_keys.forEach((value) => {

			if(!options[value]) {

				options[value] = default_options[value];
			}
		});

		return options;
	}

	_make_read_data(data) {

		let res = "";

		let i = 1;

		data.forEach((value) => {

			res +=  i > 1? ".":"";

			res += data_type[value.type] + "-";

			res += value.data;

			i ++;
		});

		return res;
	}
	
	_make_tap_mode_result (data_str, options) {

		let res;

		res = `read=${data_str}=`;

		if(!options.val_name) {

			options.val_name = "val_" + this.value_num;
			this.value_num ++;
		}

		res += options.val_name + ",";

		res += options.re_enter_if_exists?"yes,":"no,";

		res += options.max + ",";

		res += options.min + ",";

		res += options.sec_wait + ",";

		res += options.play_ok_mode + ",";

		res += options.block_asterisk?"yes,":"no,";

		res += options.allow_zero?"yes,":"no,";

		res += options.replace_char + ",";

		res += options.digits_allowed?options.digits_allowed.join("."):"" + ",";

		res += options.amount_attempts?options.amount_attempts:"" + ",";

		res += options.read_none?options.read_none:"" + ",";

		res += options.read_none?options.read_none:"";

		return res;

	}
};