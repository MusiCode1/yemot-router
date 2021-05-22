const express = require("express");
const port = 3000;

const app = express();

const { Yemot_router } = require("./");

const y = Yemot_router();

y.add_fn("/", async (call) => {

	let massage = [{ type: "text", data: "היי, תקיש 10" }];
	let r = await call.read(massage);

	console.log(r);

	massage = [
		{ type: "text", data: "הקשת " + r.data },
		{ type: "text", data: "אנא הקלט את הרחוב בו אתה גר" }
	];
	r = await call.read(massage, "record");

	console.log(r);

	massage = [{ type: "text", data: "אנא אמור את שם הרחוב בו אתה גר" }];
	r = await call.read(massage, "stt");

	console.log(r);

	massage = [{ type: "text", data: "אמרת" }];
	r = await call.id_list_message(massage, true);

	console.log(r);

	call.go_to_folder("/1");

});

app.use("/", y);

app.listen(port, () => {
	console.log("lisen in port", port);
});
