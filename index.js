const express = require("express");
const EventEmitter = require("events");

const port = 3000;

class call {
	constructor(call_id, event) {
		this.call_id = call_id;
		this.event = event;

	}

	/**
	 * @param {Request} req 
	 * @param {Response} res 
	 * @param {NextFunction} next
	 */
	get_req_vals(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;
	}
	async run() {
		this.res.send('תענה לa, 1');
		this.next();
		let event = this.event;
		let call_id = this.call_id;

		await new Promise((resolve) => {
			event.once(call_id, () => resolve());
		});

		return this.req.query.a;
	}
}

class yemot {
	constructor() {
		this.express = express();
		this.active_calls = {};
		this.event = new EventEmitter();
	}

	get(path, fn) {
		this.express.get(path, (req, res, next) => {

			let call_id = req.query.ApiCallId;

			let current_call = this.active_calls[call_id];
			let is_new_req = false;

			if (!current_call) {
				current_call = this.active_calls[call_id] = new call(call_id, this.event);
				is_new_req = true;
				console.log(call_id + ' is new');
			} else {
				console.log(call_id + ' is return');

				let r = this.event.listeners(call_id).length;
				console.log(r);
				this.event.emit(call_id);
			}

			current_call.get_req_vals(req, res, next);

			if (is_new_req) {
				fn(current_call).then(() => {
					console.log(this);
					delete this.active_calls[call_id];
					console.log(call_id, 'deleted');
				});
			}
		});
	}

	listen() {

		this.express.listen(3000, () => { console.log('lisen in port 3000'); });
	}
}

const y = new yemot();

y.get('/', async (call) => {
	let r = await call.run();
	console.log(call.call_id, r);
	call.res.send('הנה, גמרנו');
});

y.listen();