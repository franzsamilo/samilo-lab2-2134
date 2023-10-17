import Loan from "../constants/loan";

export function handleGenerateStatusPage(loan: Loan): string {
  const repaymentAmount = loan.loan_amount * 1.2; 
  const isPastDue = true
  const isNearDue = true
  const totalAmountReceived = 1
  const totalAmountReceivable = 1

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loan Status</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .status-box {
          background-color: #f9f9f9;
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
      </style>
    </head>
    <body>
      <div class="status-box">
        <h1>Loan Status</h1>
        <p>Name: ${loan.name}</p>
        <p>Phone: ${loan.phone}</p>
        <p>Loan Amount: PHP${loan.loan_amount}</p>
        <p>Reason: ${loan.reason}</p>
        <p>Status: ${loan.status}</p>
        <p>Application ID: ${loan.unique_token}</p>
        <p>Repayment Amount: PHP${repaymentAmount}</p>
        <p>Is Past Due: ${isPastDue ? 'Yes' : 'No'}</p>
        <p>Is Near Due: ${isNearDue ? 'Yes' : 'No'}</p>
        <p>Total Amount Received: PHP${totalAmountReceived}</p>
        <p>Total Amount Receivable: PHP${totalAmountReceivable}</p>
      </div>
    </body>
    </html>
  `;
}
