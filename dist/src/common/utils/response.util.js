"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data, message = 'Success') => ({
    success: true,
    message,
    data,
});
exports.successResponse = successResponse;
const errorResponse = (message, errors) => ({
    success: false,
    message,
    errors,
});
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.util.js.map