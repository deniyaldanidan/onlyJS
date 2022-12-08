"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect_DB = () => {
    var _a;
    if ((_a = process.env.DB_URI) === null || _a === void 0 ? void 0 : _a.length) {
        try {
            mongoose_1.default.set('strictQuery', true);
            mongoose_1.default.connect(process.env.DB_URI);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        throw Error("Database URI is not available");
    }
};
exports.default = connect_DB;
