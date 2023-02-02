"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationToString = exports.daysToString = void 0;
const daysToString = (value) => {
    let text = '';
    for (const item of Object.entries(value)) {
        if (item[1]) {
            text = text + (text.length ? ',' : '') + item[0].slice(0, 3);
        }
    }
    return text;
};
exports.daysToString = daysToString;
const locationToString = (value) => {
    let text = '';
    for (const item of Object.entries(value)) {
        if (item[1]) {
            text = text + (text.length ? ', ' : '') + item[1];
        }
    }
    return text;
};
exports.locationToString = locationToString;
//# sourceMappingURL=formatString.js.map