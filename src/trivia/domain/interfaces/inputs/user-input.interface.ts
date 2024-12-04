import { Role } from "../../role.enum.ts";

export interface UserInputInterface {
    name: string;
    email: string;
    password: string;
    role: Role;
  }
  