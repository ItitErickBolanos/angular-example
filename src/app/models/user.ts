import { Roles } from "./roles";

export interface User {
    id: string,
    username: string,
    password: string,
    role: Roles
}