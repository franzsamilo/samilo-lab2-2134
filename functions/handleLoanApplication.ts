import { IncomingMessage, ServerResponse } from 'http';
import { generateUniqueToken } from "./handleGenerateToken";
import { generateSuccessPage } from "./handleGenerateSucessPage";
import loansPool from "../db/loansDB";
import Loan from "../constants/loan";
import { parseFormData } from './parseData'; 

export async function handleLoanApplication(request: IncomingMessage, response: ServerResponse) {
  try {
    const formData = await parseFormData(request);
    const urlParams = new URLSearchParams(request.url?.split('?')[1] || '');
    const loanData: Loan = {
      name: formData.name || "",
      phone: formData.phone || "",
      loan_amount: parseFloat(formData.loan_amount || "0"),
      reason: formData.reason || "",
      status: "APPLIED",
      unique_token: generateUniqueToken(32),
    };

    const loanDataTest = [
      urlParams.get('name'),
      urlParams.get('phone'),
      parseFloat(urlParams.get('loan_amount') || '0'),
      urlParams.get('reason'),
      "APPLIED",
      generateUniqueToken(32),
    ]

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
    response.writeHead(200, { "Content-Type": "text/html" }).end(successPage);
    console.log("Loan application successful:", insertedLoan);
  } catch (error) {
    console.error("Error inserting loan application:", error);
    response.writeHead(500).end("Internal Server Error");
  }
}
