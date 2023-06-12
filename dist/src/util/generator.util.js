"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDigitCode = exports.generateKey = void 0;
const generateKey = (length = 36) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = length; i > 0; i--) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};
exports.generateKey = generateKey;
const generateDigitCode = (length = 4) => {
    const startAt = 1 + '0'.repeat(length - 1);
    const endAt = 9 + '0'.repeat(length - 1);
    const generateCode = `${Math.floor(Number(startAt) + Math.random() * Number(endAt))}`;
    return generateCode;
};
exports.generateDigitCode = generateDigitCode;
//# sourceMappingURL=generator.util.js.map