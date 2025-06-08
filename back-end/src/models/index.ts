//-------------------------------- Users -----------------------------------//
export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    logged: boolean;
}

export interface IUserInput {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserLoginInput {
    email: string;
    password: string;
}

export abstract class IUserProvider {
    abstract list(): Promise<IUser[] | null>;
    abstract create(user: IUserInput): Promise<IUser | null>;
    abstract delete(id: string): Promise<void>;
    abstract update(user: IUser): Promise<IUser | null>;
    abstract login(user: IUserLoginInput): Promise<IUser | null>;
    abstract logout(id: string): Promise<void>;
}

//-------------------------------- Trashs -----------------------------------//
export interface ITrash {
    id: string;
    name: string;
    location: string;
    status: string;
}

export interface ITrashInput {
    name: string;
    location: string;
}

export abstract class ITrashProvider {
    abstract list(): Promise<ITrash[] | null>;
    abstract create(trash: ITrashInput): Promise<ITrash | null>;
    abstract delete(id: string): Promise<void>;
    abstract update(trash: ITrash): Promise<ITrash | null>;
}