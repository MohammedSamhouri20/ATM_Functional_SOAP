import { hash } from 'bcrypt';
import { User } from './entities/User.js';
import { Account } from './entities/Account.js';
import { AppDataSource } from './AppDataSource.js';


export async function seeder(): Promise<void> {
    const SALT_ROUNDS = 10;
    type UserData = {
        name: string;
        balance: number;
        pin: string;
    }
    const usersData : UserData[] = [
    { name: 'Alice', balance: 1000.5, pin: await hash('1111', SALT_ROUNDS) },
    { name: 'Bob', balance: 2000.75, pin: await hash('2222', SALT_ROUNDS) },
    { name: 'Charlie', balance: 1500.0, pin: await hash('3333', SALT_ROUNDS) },
    { name: 'Diana', balance: 500.25, pin: await hash('4444', SALT_ROUNDS) },
    { name: 'Ethan', balance: 3000.0, pin: await hash('5555', SALT_ROUNDS) },
    ];

    for (const userData of usersData) {
        const newUser: User = new User();
        newUser.name = userData.name;
        const newAccount: Account = new Account();

        newAccount.balance = userData.balance;
        newAccount.pin = userData.pin;
        newAccount.transactions = [];

        newUser.account = newAccount;
        newAccount.user = newUser;

        await AppDataSource.manager.save(newAccount);

    }
}