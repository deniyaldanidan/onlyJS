"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
const corsOptions = {
    origin: function (origin, callback) {
        if (typeof origin === 'string') {
            if (allowedOrigins_1.default.includes(origin)) {
                return callback(null, true);
            }
            else {
                return callback(new Error("Sorry, Not Allowed by CORS"));
            }
        }
        if (typeof origin === "undefined") {
            return callback(null, true); //* During Dev allow, During Prouction produce an error like above
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
};
exports.default = corsOptions;
