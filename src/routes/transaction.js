import express, { Router } from "express";
import {sql} from "../config/db.js";
import { createTransaction,
        gettransactionbyid,
        deletebyid,
        getsummary} from "../controller/transactioncontroller.js";
const router = new Router()

router.get("/:user_id", gettransactionbyid);
router.get("/summary/:user_id", getsummary);
router.post("/", createTransaction);
router.delete("/:id", deletebyid);

export default router;

