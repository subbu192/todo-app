import { z } from "zod";

export const UserLoginSchema = z.object({
    usermail: z.string().email(),
    userpass: z.string().min(6, { message: "Password is too short." }).max(12, { message: "Password is too big." })
});

export const UserRegisterSchema = z.object({
    username: z.string().min(2, { message: "Username is too short" }).max(12, { message: "Username is too big." }),
    usermail: z.string().email(),
    userpass: z.string().min(6, { message: "Password is too short." }).max(12, { message: "Password is too big." })
});