import express from "express";

import multer from "multer";
import path from "path";
import xslx from "xlsx"
import { db } from "../utils/db";
const upload=multer({dest:"uploads/"});
const router=express.Router();

router.post("/",upload.single("file"),async(req:any,res:any)=>{
    try {
        const file=req.body.file;

    if(!file){
        return res.status(400).json({message:"pls upload the file"});
    }

    const dir=path.join(file.name.path);
    const worksheet=xslx.readFile(dir);
    const sheetName=worksheet.SheetNames[0];
    const data:any=worksheet.Sheets[sheetName];

    for(let rows of data){
        // row have sender name , msg and timestamp
        await db.execute(`insert into chats (sender,message,time) values(?,?,?)`,[rows.sender,rows.message,rows.time])
    }

    return res.send("chat from xl have been uploaded to mysql")

    } catch (error) {
        return res.send(500).json({message:"something went wrong while inserting the chat to mysql"});
    }
})

export default router;