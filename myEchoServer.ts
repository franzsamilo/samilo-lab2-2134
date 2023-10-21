import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs/promises";
import { handleLoanApplication } from "./functions/handleLoanApplication";
import { handleLoanStatus } from "./functions/handleLoanStatus";

const server = http.createServer(async (request: IncomingMessage, response: ServerResponse) => {
  const url = request.url;

  if (url === "/apply-loan") {
    try {
      const contents = await fs.readFile("apply-loan.html", "utf8");
      response.writeHead(200, { "Content-Type": "text/html" }).end(contents);
    } catch (error) {
      console.error(error);
      response.writeHead(500).end("Load Error");
    }
  } else if (url === "/apply-loan-success") {
    try {
      await handleLoanApplication(request, response);
    } catch (error) {
      console.error(error);
      response.writeHead(500).end("Load Error");
    }
  } else if (url?.startsWith("/loan-status-")) {
    handleLoanStatus(request, response);
  } else {
    response.writeHead(500).end("Lol what? Does not exist.");
  }
});

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000/apply-loan");
});