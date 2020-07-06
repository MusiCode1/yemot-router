const express = require("express");
const port = 3000;

const app = express();

const yemot_router = require("./");

const y = yemot_router();

y.add_fn("/", async (call) => {

	let massage = [{ type: "text", data: "היי, תקיש 10" }];
	let r = await call.read(massage);

	if(r.hangup) {
		console.log("hangup!!");
		
		return;
	}

	massage = [
		{ type: "text", data: "הקשת " + r.data },
		{ type: "text", data: "אנא הקלט את הרחוב בו אתה גר" }
	];
	r = await call.read(massage, "record");

	if(r.hangup) {
		return;
	}

	massage = [{ type: "text", data: "אנא אמור את שם הרחוב בו אתה גר" }];
	r = await call.read(massage, "stt");

	if(r.hangup) {
		return;
	}

	massage = [{ type: "text", data: "אמרת" }];
	r = await call.id_list_message(massage);

	if(r.hangup) {
		return;
	}
});

app.use("/", y);

app.listen(port, () => {
	console.log("lisen in port", port);
});
