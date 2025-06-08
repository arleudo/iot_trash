import { v4 as uuid } from "uuid";
import * as fs from "fs";
import { UserNotExists } from "../errors";
import { IUser, IUserInput, IUserLoginInput, IUserProvider } from "../models";
import { UserLoginError } from "../errors/UserLoginError";

const FILE_PATH = "assets/users.json";

export class FileUserProvider implements IUserProvider {
    private users: IUser[];

    constructor() {
        this.users = this.loadFromFile();
    }

    async login(user: IUserLoginInput): Promise<IUser> {
        const index = this.users.findIndex((u) => u.email === user.email && u.password === user.password);
        if (index == -1) {
            throw new UserLoginError();
        }
        this.users[index].logged = true;
        this.saveToFile();
        return this.users[index];
    }
    async logout(id: string): Promise<void> {
        const index = this.users.findIndex((u) => u.id === id);
        if (index == -1) {
            throw new UserNotExists();
        }
        this.users[index].logged = false;
        this.saveToFile();
    }

    private loadFromFile(): IUser[] {
        try {
            const data = fs.readFileSync(FILE_PATH, "utf-8");
            return JSON.parse(data) as IUser[];
        } catch (error) {
            return [];
        }
    }

    private saveToFile(): void {
        fs.writeFileSync(FILE_PATH, JSON.stringify(this.users, null, 2), "utf-8");
    }

    async update(user: IUser): Promise<IUser> {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index < 0) {
            throw new UserNotExists();
        }
        this.users[index] = user;
        this.saveToFile();
        return this.users[index];
    }

    async delete(id: string): Promise<void> {
        const exist = this.users.find((p) => p.id === id);
        if (!exist) {
            throw new UserNotExists();
        }
        this.users = this.users.filter((p) => p.id !== id);
        this.saveToFile();
    }

    async create(user: IUserInput): Promise<IUser> {
        const p = { id: uuid(), logged: false, ...user } as IUser;
        this.users.push(p);
        this.saveToFile();
        return p;
    }

    async list(): Promise<IUser[]> {
        return this.users;
    }
}
