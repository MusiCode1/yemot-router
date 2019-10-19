const router = require("express").Router();
const ext = require("../yemot_api");
const _ = undefined;
const { Name } = require("../models");

router.get("/", (req, res, next) =>
	ext.run(req, res, next, async function*(call) {

		let data = [{ type: "text", data: "אנא הקש את מספר הטלפון" }];

		let phone = yield call.read(data, _, { max: 10 });

		let name = await Name.get_name(phone);

		if(name !== null) {
			data = [{ type: "text", data: "מספר הטלפון הוא: " + phone + " " + name.name }];
		} else {
			data = [{ type: "text", data: "מספר הטלפון אינו מופיע במאגר" }];
		}

		

		return call.id_list_message(data);
	})
);

module.exports = router;
