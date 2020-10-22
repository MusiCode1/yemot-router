
module.exports = function check_request(query) {

	if (
		query.ApiPhone &&
		query.ApiDID &&
		query.ApiExtension &&
		query.ApiCallId
	) {
		return true;
	} return false;

}