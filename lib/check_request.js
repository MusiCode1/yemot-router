
module.exports = (query) => {
	if ((query.ApiPhone && query.ApiPhone.length)
		&& query.ApiDID &&
		(query.ApiExtension || query.ApiExtension === "")
		&& query.ApiCallId) {
		return true;
	}
	return false;
};