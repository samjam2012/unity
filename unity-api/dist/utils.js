"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.toCamelCase = (data) => {
    const normalizedObj = {};
    for (const [key, value] of Object.entries(data)) {
        const normalizedKey = lodash_1._.camelCase(key);
        normalizedObj[normalizedKey] = value;
    }
    return normalizedObj;
};
//# sourceMappingURL=utils.js.map