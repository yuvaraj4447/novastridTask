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
exports.generateToken = exports.insertUser = exports.checkUser = void 0;
const db_1 = require("../utils/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const checkUser = (email, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield db_1.db.execute("select * from users where email=?", [email]);
        if (type === "REGISTER") {
            if (userData.length > 0) {
                return true;
            }
            return false;
        }
        if (type === "LOGIN") {
            return userData;
        }
    }
    catch (error) {
        console.log(error);
        //throw new Error("SOMETHING WENT WRONG IN CHECKUSER FUNCTION");
    }
});
exports.checkUser = checkUser;
const insertUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.execute("insert into users (email,password) values(?,?)", [email, password]);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.insertUser = insertUser;
const generateToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonwebtoken_1.default.sign({ id: userId }, config_1.jwtSecretKey, { expiresIn: "1h" });
    }
    catch (error) {
        console.log(error);
        //throw new Error("something went wrong while generation token");
    }
});
exports.generateToken = generateToken;
