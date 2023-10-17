import { IncomingMessage } from "http";

export async function parseFormData(
  request: IncomingMessage
): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      const formData: Record<string, string> = {};
      body = body.replace(/\+/g, ' ');
      body.split("&").forEach((pair) => {
        const [key, value] = pair.split("=");
        formData[decodeURIComponent(key)] = decodeURIComponent(value);
      });
      resolve(formData);
    });

    request.on("error", (error) => {
      reject(error);
    });
  });
}