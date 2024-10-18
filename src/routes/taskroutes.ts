import express from "express";
import {db} from "../utils/db"
const router=express.Router();

router.get("/getTask",async(req:any,res:any)=>{

    const status=req.query.status;
// 0-unfinised
// 1 - finised
    try {
        let task:any=[];
        if(status){
        task=db.execute(`select * from tasks where status=?`,[status])
        }
        task=db.execute(`select * from tasks`,[]);

        return res.send(task);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"something went wrong while getting tasks"});
    }
})

export default router;