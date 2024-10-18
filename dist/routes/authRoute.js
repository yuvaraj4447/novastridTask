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
const bcrypt_1 = __importDefault(require("bcrypt"));
const authcontroller_1 = require("../controller/authcontroller");
const router = express_1.default.Router();
// route to register the user by gettting thier email and password from body
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "enter the required fields username and password" });
        }
        // decode the passwrod using bcrypt 
        const decodedPasword = yield bcrypt_1.default.hash(password, 10);
        // now store the email and password in db;
        //db fromat 
        //id int auto increment primarykey
        //email varchar(50)
        //password varchar(255)
        // check whether already user is there or not 
        if (yield (0, authcontroller_1.checkUser)(email, "REGISTER")) {
            return res.status(400).json({ message: "user already present, please login" });
        }
        if (!(yield (0, authcontroller_1.insertUser)(email, password))) {
            return res.status(400).json({ message: "something went wrong while creating user" });
        }
        return res.json({ message: "user created suceessfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong while creating user" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "enter the required fields username and password" });
        }
        let userData = yield (0, authcontroller_1.checkUser)(email, "LOGIN");
        if (userData.length > 0) {
            const token = (0, authcontroller_1.generateToken)(userData[0].id);
            return res.json({ token });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong while login user" });
    }
}));
exports.default = router;
