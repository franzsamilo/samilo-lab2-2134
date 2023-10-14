import Loan from "../constants/loan";

export function generateSuccessPage(loan: Loan): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loan Application Success</title>
    </head>
    <body>
      <h1>Loan Application Success!</h1>
      <p>Name: ${loan.name}</p>
      <p>Phone: ${loan.phone}</p>
      <p>Loan Amount: PHP${loan.loan_amount}</p>
      <p>Reason: ${loan.reason}</p>
      <p>Status: ${loan.status}</p>
      <p>Application ID: ${loan.unique_token}</p>
    </body>
    </html>
  `;
}