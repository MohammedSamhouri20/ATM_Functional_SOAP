import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  type Relation,
} from "typeorm";
import { User } from "./User.js";
import { Transaction } from "./Transaction.js";

@Entity({ name: "accounts" })
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal", { precision: 10, scale: 2, default: "0.00" })
  balance!: number;

  @Column({ type: "varchar", length: 255, select: false })
  pin!: string;

  @OneToOne(() => User, (user) => user.account, { cascade: true })
  @JoinColumn()
  user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions!: Relation<Transaction>[];
}
