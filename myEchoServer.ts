import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs/promises";
import { handleLoanApplication } from "./functions/handleLoanApplication";

const server = http.createServer(async (request: IncomingMessage, response: ServerResponse) => {
  const url = request.url;
  const method = request.method;

  if (url === "/apply-loan" && method === "GET") {
    try {
      const contents = await fs.readFile("apply-loan.html", "utf8");
      response.writeHead(200, { "Content-Type": "text/html" }).end(contents);
    } catch (error) {
      console.error(error);
      response.writeHead(500).end("Internal Server Error");
    }
  } else if (url === "/apply-loan-success" && method === "POST") {
    try {
      await handleLoanApplication(request, response);
    } catch (error) {
      console.error(error);
      response.writeHead(500).end("Internal Server Error");
    }
  } else {
    response.writeHead(404).end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000/apply-loan");
});
