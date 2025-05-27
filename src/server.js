import express from "express";
import dotenv from "dotenv";
import {initDB} from "./config/db.js"
import ratelimiter from "./middleware/ratelimiter.js";
import trasaction from "./routes/transaction.js"

dotenv.config();
const PORT =process.env.PORT ||5001;
const app = express();
app.use(ratelimiter);
app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("it's working");
// })
app.use("/api/transaction",trasaction);

initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("listening on http://localhost:5001",PORT);
 });
})