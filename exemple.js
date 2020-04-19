const express = require("express");
const port = 3000;

const app = express();

const yemot_router = require("./");

const y = yemot_router();

y.add_fn("/", async (call) => {

	let massage = [{ type: "text", data: "היי, תקיש 10" }];
	let r = await call.read(massage);

	console.log(call.call_id, r);

	massage = [{ type: "text", data: "הקשת " + r + " תקיש 1 ותעוף מפה" }];
	r = await call.id_list_message(massage);

	massage = [{ type: "text", data: "אנא אמור את הרחוב בו אתה גר" }];
	r = await call.read(massage, "stt");

	console.log("noop");
});

app.use("/", y);

app.listen(port, () => {
	console.log("lisen in port", port);
});
