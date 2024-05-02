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

export const TodoSchema = z.object({
    todo_title: z.string().min(3, { message: "Todo Title is too short" }).max(24, { message: "Todo Title is too big" }),
    todo_desc: z.string().min(6, { message: "Todo Description is too short" }).max(512, { message: "Todo Description is too big" }),
    todo_date: z.string().date(),
    todo_group: z.string(),
    todo_category: z.string(),
    todo_priority: z.number(),
    userid: z.number()
})