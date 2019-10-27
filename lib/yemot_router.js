const Call = require("./call");
const Router = require("express").Router;
const EventEmitter = require("events");

const Yemot_Router = function Yemot_Router () {

	const router = Router();

	Object.setPrototypeOf(Router, Yemot_Router);

	const events = new EventEmitter();
	const active_calls = {};

	router.add_fn = function (fn) {

		this.all("/", (req, res, next) => {

			const call_id = req.query.ApiCallId;

			const [current_call, is_new_req] = get_current_call(call_id);

			current_call.get_req_vals(req, res, next);

			if (is_new_req) {

				fn(current_call).then(() => {

					delete active_calls[call_id];
					console.log(call_id, "deleted");
				});

			} else {
				events.emit(call_id);
			}
		});
	};

	const get_current_call = function (call_id) {

		let current_call = active_calls[call_id];
		let is_new_req = false;

		if (!current_call) {
			current_call = active_calls[call_id] = new Call(call_id, events);
			
			is_new_req = true;
			console.log(call_id + " is new");
		}

		return [current_call, is_new_req];
	};

	/**
	 * @this Yemot_Router
	 */
	return router;
};

module.exports = Yemot_Router;