import {db} from "../utils/db"
import jwt from "jsonwebtoken"
import {jwtSecretKey} from "../configs/config"
export const checkUser=async(email:string,type:"LOGIN"|"REGISTER")=>{
    try {
    const userData= await db.execute("select * from users where email=?",[email]);
    if(type==="REGISTER"){
    if(userData.length>0){
        return true;
    }
    return false;
   }

   if (type==="LOGIN") {
    return userData;
   }

    } catch (error) {
        console.log(error);
        //throw new Error("SOMETHING WENT WRONG IN CHECKUSER FUNCTION");
    }
}


export const insertUser=async(email:string,password:string)=>{
try {
    await db.execute("insert into users (email,password) values(?,?)",[email,password]);
    return true;
} catch (error) {
    return false;
}
}


export const generateToken=async(userId:number)=>{
    try {
       return jwt.sign({id:userId},jwtSecretKey,{expiresIn:"1h"});
    } catch (error) {
        console.log(error);
        //throw new Error("something went wrong while generation token");
    }
}