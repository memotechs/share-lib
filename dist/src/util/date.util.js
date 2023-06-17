"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = exports.addSecond = void 0;
const dayjs_1 = require("dayjs");
const addSecond = (duration) => {
    return (0, dayjs_1.default)().add(duration, 'seconds').toDate();
};
exports.addSecond = addSecond;
const isExpired = (date) => {
    const currentDate = (0, dayjs_1.default)();
    return (0, dayjs_1.default)(date).isBefore(currentDate);
};
exports.isExpired = isExpired;
//# sourceMappingURL=date.util.js.map