"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const home_1 = __importDefault(require("./routes/home"));
const Handle404_1 = __importDefault(require("./middlewares/Handle404"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const connect_DB_1 = __importDefault(require("./config/connect_DB"));
const mongoose_1 = __importDefault(require("mongoose"));
const task_1 = __importDefault(require("./routes/task"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || "3500";
(0, connect_DB_1.default)();
morgan_1.default.token('myDate', () => new Date().toLocaleString('en-GB', { timeZone: "IST" }));
app.use((0, morgan_1.default)(':myDate :url :method :remote-addr :status'));
app.use((0, morgan_1.default)(':myDate :url :method :remote-addr :status', { stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, "..", 'logs', 'http.log'), { flags: "a" }) }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, express_1.json)());
app.use("/", home_1.default);
app.use("/tasks", task_1.default);
app.use("*", Handle404_1.default);
app.use(errorHandler_1.default);
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
        console.log(`Server listening on Port: ${PORT}`);
    });
});
