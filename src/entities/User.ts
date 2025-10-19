import { Entity, PrimaryGeneratedColumn, Column, OneToOne, type Relation } from 'typeorm';
import { Account } from './Account.js';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'varchar', length: 255 })
    name!: string;

  @OneToOne(() => Account, (account) => account.user)
    account!: Relation<Account>;
}
