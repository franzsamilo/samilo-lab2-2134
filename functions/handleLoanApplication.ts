import { IncomingMessage, ServerResponse } from "http";
import { generateUniqueToken } from "./handleGenerateToken";
import { generateSuccessPage } from "./handleGenerateSucessPage";
import loansPool from "../db/loansDB";
import Loan from "../constants/loan";
import { parseFormData } from "../helpers/parseData";

export async function handleLoanApplication(
  request: IncomingMessage,
  response: ServerResponse
) {
  try {
    const formData = await parseFormData(request);
    const loanData: Loan = {
      name: formData.name || "",
      phone: formData.phone || "",
      loan_amount: parseFloat(formData.loan_amount || "0"),
      reason: formData.reason || "",
      status: "APPLIED",
      unique_token: generateUniqueToken(32),
      approval_date: new Date(),
      cash_release_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      repayment_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    const result = await loansPool.query(
      "INSERT INTO loans (name, phone, loan_amount, reason, status, unique_token, approval_date, cash_release_date, repayment_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        loanData.name,
        loanData.phone,
        loanData.loan_amount,
        loanData.reason,
        loanData.status,
        loanData.unique_token,
        loanData.approval_date,
        loanData.cash_release_date,
        loanData.repayment_date,
      ]
    );

    const insertedLoan = result.rows[0];
    const successPage = generateSuccessPage(insertedLoan);
    response.writeHead(200, { "Content-Type": "text/html" }).end(successPage);
    console.log("Loan application successful:", insertedLoan);
  } catch (error) {
    console.error("Error inserting loan application:", error);
    response.writeHead(500).end("Internal Server Error");
  }
}
