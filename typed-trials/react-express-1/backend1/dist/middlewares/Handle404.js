"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handle404 = (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ err: "404 Not found" });
    }
    else {
        res.type("text").send("Sorry Not Found in the Server");
    }
};
exports.default = handle404;
