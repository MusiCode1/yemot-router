const { Hangup_error, Timeout_error } = require("./errors.js");
const check_request = require("./check_request");
const Call = require("./call");

const Router = require("express").Router;
const EventEmitter = require("events");


function Yemot_router(opt = { timeout: 0 }) {

	const router = Router();

	const events = new EventEmitter();
	const active_calls = {};

	Object.setPrototypeOf(Router, Yemot_router);

	router.add_fn = function (path, fn) {

		this.all(path, (req, res, next) => {

			if (!check_request(req.query)) {

				res.json({ message: "error" });
				return;
			}

			req.query = check_query(req.query);

			const call_id = req.query.ApiCallId;

			const [current_call, is_new_call] = get_current_call(call_id);

			current_call.get_req_vals(req, res, next);

			if (is_new_call) {

				new_call(fn, call_id, current_call);

			} else {

				events.emit(call_id, is_hangup(current_call.query));
			}
		});
	};

	async function new_call(fn, call_id, call) {

		try {
			const r = await fn(call);
			on_call_end(call_id, r);

		} catch (error) {

			if (error instanceof Hangup_error) {
				on_hangup(call_id);

			} else if (error instanceof Timeout_error) {
				on_timeout(call_id);
			} else {
				throw error;
			}
		}
	}

	function on_call_end(call_id, r) {
		delete active_calls[call_id];
		console.log(call_id, "deleted", r);

	}

	function on_hangup(call_id) {
		delete active_calls[call_id];
		console.log(call_id, "hangup");
	}

	function on_timeout(call_id) {
		delete active_calls[call_id];
		console.error(call_id, "is timeout!");

	}

	function is_hangup(query) {
		if (query.hangup &&
			query.hangup == "yes") {

			return true;
		}
		return false;
	}

	function get_current_call(call_id) {

		let is_new_call = false;

		let current_call = active_calls[call_id];

		if (!current_call) {
			is_new_call = true;

			current_call = make_new_call();
		}

		return [current_call, is_new_call];

		function make_new_call() {

			const call = new Call(call_id, events, opt.timeout);

			active_calls[call_id] = call;

			console.log(call_id + " is new");

			return call;
		}
	}

	/** אם ערך מסויים יש כמה פעמים, שייקבע רק האחרון **/
	function check_query(query) {

		if (typeof query == "object") {
			let iterator;

			for (const key of Object.keys(query)) {

				iterator = query[key];

				if (typeof iterator === "object") {

					query[key] = iterator[(iterator.length - 1)];
				}
			}
		}

		return query;
	}

	return router;
}

Yemot_router.Yemot_router = Yemot_router;

module.exports = Yemot_router;