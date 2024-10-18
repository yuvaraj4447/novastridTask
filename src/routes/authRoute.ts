import express from "express";
import bcrypt from "bcrypt"
import {checkUser,insertUser,generateToken} from "../controller/authcontroller"
const router=express.Router();

// route to register the user by gettting thier email and password from body
router.post("/register",async(req:any,res:any)=>{

    try {
       const {email,password} = req.body;
       if(!email || !password){
        return res.status(400).json({message:"enter the required fields username and password"});
       }

       // decode the passwrod using bcrypt 

       const decodedPasword=await bcrypt.hash(password,10);

       // now store the email and password in db;

       //db fromat 
       
       //id int auto increment primarykey
       //email varchar(50)
       //password varchar(255)

       // check whether already user is there or not 
       if(await checkUser(email,"REGISTER")){
        return res.status(400).json({message:"user already present, please login"});
       }

       if(!await insertUser(email,password)){
        return res.status(400).json({message:"something went wrong while creating user"});
       }

       return res.json({message:"user created suceessfully"});

    } catch (error) {
        console.log(error);
        res.status(400).json({message:"something went wrong while creating user"});
    }

})


router.post("/login",async(req:any,res:any)=>{

    try {
       const {email,password} = req.body;
       if(!email || !password){
        return res.status(400).json({message:"enter the required fields username and password"});
       }
       let userData:any=await checkUser(email,"LOGIN");
       if(userData.length>0){
       const token= generateToken(userData[0].id);
       return res.json({token});
       }
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"something went wrong while login user"});
    }

})

export default router;
