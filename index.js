const express = require("express");
const router = require("./app/routers/");
const port = 3000;

const app = express();

app.use("/", router);

app.listen(port, () => {
	console.log("lisen in port", port);
});