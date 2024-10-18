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
const db_1 = require("../utils/db");
const router = express_1.default.Router();
router.get("/getTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status;
    // 0-unfinised
    // 1 - finised
    try {
        let task = [];
        if (status) {
            task = db_1.db.execute(`select * from tasks where status=?`, [status]);
        }
        task = db_1.db.execute(`select * from tasks`, []);
        return res.send(task);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong while getting tasks" });
    }
}));
exports.default = router;
