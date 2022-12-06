"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HomeRouter = (0, express_1.Router)();
HomeRouter.get("/", (req, res) => {
    res.json({ msg: "Hello World" });
});
exports.default = HomeRouter;
