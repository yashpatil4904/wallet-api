import {sql} from "../config/db.js"

export async function createTransaction(req,res){
      try {
        const { title, amount, category, user_id } = req.body;
    
        if (!title || !category || !user_id || amount === undefined) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        const transaction = await sql`
          INSERT INTO transaction(user_id, title, category, amount)
          VALUES (${user_id}, ${title}, ${category}, ${amount})
          RETURNING *;
        `;
    
        console.log(transaction);
        res.status(201).json(transaction[0]);
      } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

export async function gettransactionbyid(req,res){
        try {
        const {user_id} = req.params;
        console.log(user_id);
        const transaction = await sql`SELECT * FROM transaction WHERE USER_ID = ${user_id}; 
        `
        console.log(transaction);
        res.status(201).json(transaction[0]);
        } catch (error) {
        console.log("ERROR in getting :", error);
        res.status(500).json({ message: "Internal Server Error" });
        }
       
    }

export async function deletebyid(req,res){

      try {
        const { id } = req.params;
        if(isNaN(parseInt(id))){
            return res.status(400).json({message : "Invalid id"});
        }
        const transaction = await sql`
          DELETE FROM transaction WHERE id = ${id} RETURNING *;
        `;
    
        if (transaction.length === 0) {
          return res.status(404).json({ message: "Transaction not found" });
        }
    
        console.log("Deleted:", transaction);
        res.status(200).json(transaction[0]);
      } catch (error) {
        console.log("ERROR in deleting:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

export async function getsummary(req,res){

  try {
    const { user_id } = req.params;

    const balanceresult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM transaction
      WHERE user_id = ${user_id};
    `;

    const incomeresult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS income
      FROM transaction
      WHERE user_id = ${user_id} AND amount > 0;
    `;

    const expenseresult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS expense
      FROM transaction
      WHERE user_id = ${user_id} AND amount < 0;
    `;

    res.status(200).json({
      balance: balanceresult[0].balance,
      income: incomeresult[0].income,
      expense: expenseresult[0].expense,
    });
  } catch (error) {
    console.log("Error generating summary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
