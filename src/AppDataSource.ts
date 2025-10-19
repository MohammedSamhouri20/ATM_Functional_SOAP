import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transaction } from "./entities/Transaction.js"
import { Account } from "./entities/Account.js"
import { User } from "./entities/User.js"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    entities: [User, Transaction, Account],
    synchronize: true,
    logging: false,
});
