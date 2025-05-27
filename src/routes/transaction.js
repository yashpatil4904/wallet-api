import express, { Router } from "express";
import {sql} from "../config/db.js";
import { createTransaction,
        gettransactionbyid,
        deletebyid,
        getsummary} from "../controller/transactioncontroller.js";
const router = new Router()
router.get("/:user_id",gettransactionbyid);
router.post("/",createTransaction );
router.delete("/:id",deletebyid);
router.get("/:user_id", getsummary);
export default router;
