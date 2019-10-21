const express = require("express");
const yemot_ext  =require("./app/yemot_api");
const port = 3000;

const app = express();

const y = new yemot_ext();

y.add_fn(async (call)=>{

	let massage = [{ type: "text", data: "היי, תקיש 10" }];

	let r = await call.read(massage);
	console.log(call.call_id, r);

	massage = [{ type: "text", data: "הקשת " + r + " תקיש 1 ותעוף מפה" }];
	r = await call.id_list_message(massage);

	console.log("noop");
	
});

app.use("/", y);

app.listen(port, ()=>{
	console.log("lisen in port", port);
});