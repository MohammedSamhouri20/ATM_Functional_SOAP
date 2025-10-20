import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  type Relation,
} from "typeorm";
import { Account } from "./Account.js";
import { TransactionType } from "../enums/TransactionType.js";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type!: TransactionType;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: "int" })
  amount!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  availableBalance!: number;

  @ManyToOne(() => Account, (account) => account.transactions, { eager: false })
  account!: Relation<Account>;
}
