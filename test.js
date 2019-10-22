const response_functions = new (require("./lib/response_functions"));
let massage;

massage = [{ type: "text", data: "hay, is text!" }];


let options = {
	/*
	val_name: "var spacial",
	max: 3,
	min: 3,
	digits_allowed: ["1", "2", "9"]*/
};

let r = response_functions.make_read_response(massage, "tap", options);

console.log(r);

console.log("noop");