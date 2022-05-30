
module.exports = function check_request(query) {

	if (
		(query.ApiPhone || query.ApiPhone === "") &&
		(query.ApiDID || query.ApiDID === "") &&
		(query.ApiExtension || query.ApiExtension === "") &&
		(query.ApiCallId || query.ApiCallId === "")
	) {
		return true;
	} return false;

};