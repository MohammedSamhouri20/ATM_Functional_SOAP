import "dotenv/config";
import { AppDataSource } from "./AppDataSource.js";
import soapApp from "./soap-app.js";

const soapServer = soapApp({
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || "localhost",
  path: "/ATMService",
});

async function start() {
  try {
    await AppDataSource.initialize();
    console.log("Database initialized");
    await soapServer.listen();
    console.log(
      `SOAP server started on http://${process.env.HOST || "localhost"}:${
        process.env.PORT || 3000
      }/ATMService?wsdl`
    );
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

start();
