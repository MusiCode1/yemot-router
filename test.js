const {EventEmitter} = require("events");

const e = new EventEmitter();

(async function name(params) {

    console.log("start!");

    await new Promise( (resolve, reason) => {

        e.once("event1", ()=> {
            resolve();
        });
    });

    console.log("end!");
    
})();