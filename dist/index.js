"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./configs/config");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const taskroutes_1 = __importDefault(require("./routes/taskroutes"));
const importchatRoute_1 = __importDefault(require("./routes/importchatRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", authRoute_1.default);
app.use("/task", taskroutes_1.default);
app.use("/import-chat", importchatRoute_1.default);
app.listen(config_1.port, () => {
    console.log(`server is running at ${config_1.port}`);
});
