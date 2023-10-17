import { IncomingMessage, ServerResponse } from "http";
import loansPool from "../db/loansDB"; 
import { handleGenerateStatusPage } from "./handleGenerateStatusPage";

export async function handleLoanStatus(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const token = url?.replace('/loan-status-', '');

  if (!token) {
    response.writeHead(400).end("Invalid URL format");
    return;
  }

  try {
    const result = await loansPool.query(
      'SELECT * FROM loans WHERE unique_token = $1',
      [token]
    );

    const loan = result.rows[0];

    if (loan) {
      const statusPage = handleGenerateStatusPage(loan); 
      response.writeHead(200, { 'Content-Type': 'text/html' }).end(statusPage);
    } else {
      response.writeHead(200).end('Loan/Token not found');
    }
  } catch (error) {
    console.error('Error fetching loan status:', error);
    response.writeHead(500).end('Internal Server Error');
  }
}
