import { z } from "zod";

export const MemberSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    team_id: z.number(),
    role: z.string(),
    name: z.string()
});

export const MemberListSchema = z.array(MemberSchema);

export type Member = z.infer<typeof MemberSchema>;

export type MemberList = z.infer<typeof MemberListSchema>;