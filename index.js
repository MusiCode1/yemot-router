const express = require("express");
const get_name = require("./app/routers/get_names");

const app = express();
const port = 3000;

app.use("/", get_name);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
