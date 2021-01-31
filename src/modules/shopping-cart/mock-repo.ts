import { ICart, IRepository } from "./interfaces";

export const repo: IRepository<ICart> = {
    delete: 
    save,
}

const save = <T>(item: T): T {
    return item;
}

const delete = <T>(item: T): T {
    return item;
}
