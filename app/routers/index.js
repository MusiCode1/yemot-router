const yemot_router = require("../yemot_api");

const y = new yemot_router();

y.add_fn(async (call) => {

	let massage = [{ type: "text", data: "היי, תקיש 10" }];
	let r = await call.read(massage);

	console.log(call.call_id, r);

	massage = [{ type: "text", data: "הקשת " + r + " תקיש 1 ותעוף מפה" }];
	r = await call.id_list_message(massage);

	console.log("noop");

});

module.exports = y;