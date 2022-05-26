const express = require("express");
const port = 3000;

const app = express();

const { Yemot_router } = require("./");

const y = Yemot_router();

y.add_fn("/", async (call) => {

	let massage = [{ type: "text", data: "שלום, אנא הקש את שמך המלא" }];
	let r = await call.read(massage, "tap", { play_ok_mode: "HebrewKeyboard" })
		.catch(error => {
			if (error.name === "Hangup_error")
				console.log(error.call.phone, "hangup");
				
			throw error;
		});

	console.log(r);

	massage = [
		{ type: "text", data: "שלום " + r },
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
