"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    // console.log(err.stack);
    res.status(500);
    res.json({ err: "Internal Error Happened" });
};
exports.default = errorHandler;
