import { Request, Response } from "express";
import { generateUniqueToken } from "./handleGenerateToken";
import { generateSuccessPage } from "./handleGenerateSucessPage";
import loansPool from "../db/loansDB";
import Loan from "../constants/loan";

export async function handleLoanApplication(req: Request, res: Response) {
  const formData = req.body;

  const loanData: Loan = {
    name: formData.name || "",
    phone: formData.phone || "",
    loan_amount: parseFloat(formData.loan_amount || "0"),
    reason: formData.reason || "",
    status: "APPLIED",
    unique_token: generateUniqueToken(30),
  };

  try {
    const result = await loansPool.query(
      "INSERT INTO loans (name, phone, loan_amount, reason, status, unique_token) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        loanData.name,
        loanData.phone,
        loanData.loan_amount,
        loanData.reason,
        loanData.status,
        loanData.unique_token,
      ]
    );

    const insertedLoan = result.rows[0];
    const successPage = generateSuccessPage(insertedLoan);
    res.send(successPage);
    console.log("Loan application successful:", insertedLoan);
  } catch (error) {
    console.error("Error inserting loan application:", error);
    res.status(500).send("Internal Server Error");
  }
}
