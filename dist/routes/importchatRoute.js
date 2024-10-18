"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const xlsx_1 = __importDefault(require("xlsx"));
const db_1 = require("../utils/db");
const upload = (0, multer_1.default)({ dest: "uploads/" });
const router = express_1.default.Router();
router.post("/", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.body.file;
        if (!file) {
            return res.status(400).json({ message: "pls upload the file" });
        }
        const dir = path_1.default.join(file.name.path);
        const worksheet = xlsx_1.default.readFile(dir);
        const sheetName = worksheet.SheetNames[0];
        const data = worksheet.Sheets[sheetName];
        for (let rows of data) {
            // row have sender name , msg and timestamp
            yield db_1.db.execute(`insert into chats (sender,message,time) values(?,?,?)`, [rows.sender, rows.message, rows.time]);
        }
        return res.send("chat from xl have been uploaded to mysql");
    }
    catch (error) {
        return res.send(500).json({ message: "something went wrong while inserting the chat to mysql" });
    }
}));
exports.default = router;
