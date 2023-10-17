import Loan from "../constants/loan";
import formatDate from "../helpers/formatDate";

export function handleGenerateStatusPage(loan: Loan): string {
  const repaymentAmount = loan.loan_amount * 1.2;
  const currentDate = new Date();

  const isPastDue =
    loan.repayment_date !== null &&
    loan.repayment_date !== undefined &&
    loan.repayment_date < currentDate;

  const isNearDue =
    loan.repayment_date !== null &&
    loan.repayment_date !== undefined &&
    loan.repayment_date > currentDate &&
    (loan.repayment_date.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24) <=
      3;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loan Status</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }

        .status-box {
          background-color: #f9f9f9;
          border: 2px solid #ccc;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
        }

        .status-box p {
          margin: 0;
          font-size: 18px;
          line-height: 1.6;
        }

        .status-box h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .status-box p.bold {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="status-box">
        <h1>Loan Status: </h1>
        <p>Name: ${loan.name}</p>
        <p>Phone: ${loan.phone}</p>
        <p>Loan Amount: PHP ${loan.loan_amount}</p>
        <p>Reason: ${loan.reason}</p>
        <p class="bold">Status: ${loan.status}</p>
        <p>Application ID/Token: ${loan.unique_token}</p>
        <p>Repayment Amount: PHP ${repaymentAmount.toFixed(2)}</p>
        <p class="bold">Approval Date: ${
          loan.approval_date ? formatDate(loan.approval_date) : ""
        }</p>
        <p class="bold">Cash Release Date: ${
          loan.cash_release_date ? formatDate(loan.cash_release_date) : ""
        }</p>
        <p class="bold">Repayment Date: ${
          loan.repayment_date ? formatDate(loan.repayment_date) : ""
        }</p>
        <p class="bold">Is Past Due: ${isPastDue ? "Yes" : "No"}</p>
        <p class="bold">Is Near Due: ${isNearDue ? "Yes" : "No"}</p>
      </div>
    </body>
    </html>
  `;
}
