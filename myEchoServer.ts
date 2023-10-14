import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from "fs";
import { handleLoanApplication } from "./functions/handleLoanApplication";
import { generateSuccessPage } from "./functions/handleGenerateSucessPage";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/apply-loan', async (req, res) => {
  try {
    const contents = await fs.readFile("apply-loan.html", "utf8");
    res.writeHead(200, { "Content-Type": "text/html" }).end(contents);

  } catch (error) {
    console.error(error);
    res.writeHead(500).end("Internal Server Error");
  }
});

app.post('/apply-loan-success', async (req, res) => {
  try {
    await handleLoanApplication(req, res);
  } catch (error) {
    console.error(error);
    res.writeHead(500).end("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000/apply-loan");
});
