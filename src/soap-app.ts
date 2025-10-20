import soap from "soap";
import fs from "fs";
import { fastify as Fastify } from "fastify";
import path from "path";
import { Deposit, Withdraw } from "./controllers/transactionController.js";
import {
  CheckBalance,
  ViewTransactions,
} from "./controllers/accountController.js";

export interface SoapServerOptions {
  port?: number;
  host?: string;
  path?: string;
}

export default (opts: SoapServerOptions = {}) => {
  const {
    port = 3000,
    host = "localhost",
    path: appPath = "/ATMService",
  } = opts;

  const fastify = Fastify({ logger: true });
  const atmService = {
    ATMService: {
      ATMServicePort: {
        Deposit,
        Withdraw,
        CheckBalance,
        ViewTransactions,
      },
    },
  };

  const wsdlPath = path.join(process.cwd(), "ATMSerivce.wsdl");
  const wsdl = fs.readFileSync(wsdlPath, "utf8");
  console.log(wsdlPath);
  soap.listen(fastify.server, appPath, atmService, wsdl);

  return {
    listen: () => {
      return new Promise<void>((resolve, reject) => {
        fastify.listen({ port, host }, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    },
  };
};
