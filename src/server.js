import express from "express";
import dotenv from "dotenv";
import {initDB} from "./config/db.js"
import ratelimiter from "./middleware/ratelimiter.js";
import trasaction from "./routes/transaction.js"
import job  from "./config/cron.js"
dotenv.config();

const PORT =process.env.PORT ||5001;
const app = express();
if(process.env.NODE_ENV === "production") job.start();
app.use(ratelimiter);
app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("it's working");
// })
app.get("/api/health",(req,res)=>{
    res.status(200).json({status : "OK"});
});
app.use("/api/transaction",trasaction);

initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("listening on http://localhost:5001",PORT);
 });
})
