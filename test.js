const { EventEmitter } = require("events");

const express = require("express");

const app = express();

const event = new EventEmitter();

const calls = {};

app.get("/", async (req, res, next) => {

    if (calls[req.query.id]) {
        calls[req.query.id].res = res;

        event.emit(req.query.id);
    } else {
        calls[req.query.id] = { res };

        calls[req.query.id].block = async function block() {

            await new Promise((resolve, reason) => {

                event.once(req.query.id, () => {

                    resolve();
                    // פה צריך לעצור
                });
            });
        }

        fn(calls[req.query.id]);

    }

});

app.listen(3000, () => {
    console.log("runing!");
})

async function fn(call) {

    const long_data = { "...": "..." };

    console.log("start!");
    call.res.end("start!");

    const r = await call.block();

    console.log("end!");
    call.res.end("end!");




}