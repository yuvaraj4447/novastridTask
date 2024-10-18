import express from "express";
import {port} from "./configs/config"
import authRoute from "./routes/authRoute"
import taskRoute from "./routes/taskroutes"
import importChatRoute from "./routes/importchatRoute"
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",authRoute);
app.use("/task",taskRoute);
app.use("/import-chat",importChatRoute)
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})

