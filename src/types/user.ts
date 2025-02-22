import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
})

export const UserUpdateSchema = z.object({
    full_name: z.string(),
    is_student_mirea: z.boolean(),
    group: z.string().optional()
})