'use strict';

const _ = require('lodash');

class ResponseFormatHelper {
	static error(errs, errorKey, data) {
		let errors = null;

		if (_.isArray(errs))
			errors = _.map(errs, errorKey);

		else if (_.isObject(errs))
			errors = [errs[errorKey]];

		else errors = [errs];

		return { errors, success: false, data };
	}

	static success(data) {
		return {
			data: data || null,
			success: true,
		};
	}
}

module.exports = ResponseFormatHelper;