const { Sequelize } = require("sequelize");

const envConfigs = require("../config/config");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = envConfigs[env];

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

const Name = sequelize.import("./name");

console.log("sequelize.js is load");

/**
 * @param {number} phone
 */
Name.get_name = async function get_name (phone) {
	return await Name.findOne({
		where: {
			phone: phone
		},
		attributes: ["phone", "name"],
		order: [["id", "DESC"], ["UpdateDate", "DESC"]]
	});
};

(async () => {
	//let o = env === "development" ? { force: true } : undefined;

	await sequelize.sync();

	console.log("Database & tables created!");
})();

module.exports = {
	Name
};
