const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

let promise = new Promise(function fn(resolve) {
	eventEmitter.once("con", () => {
		resolve();
		promise = new Promise(fn);
	});
});

async function a() {
	await promise;
	console.log("exe1!");

	await promise;
	console.log("exe2!");

	await promise;
	console.log("exe3!");
}

a();

setInterval(() => {
	eventEmitter.emit("con");
}, 1000);
