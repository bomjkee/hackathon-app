import { z } from "zod";
import { MemberListSchema } from "./member";

export const TeamSchema = z.object({
    id: z.number(),
    name: z.string(),
    is_open: z.boolean(),
    description: z.string().optional(),
    hackathon_id: z.number()
});

export const TeamListSchema = z.array(TeamSchema);

export const TeamWithMembersSchema = z.object({
    team: TeamSchema,
    members: MemberListSchema
});

export type Team = z.infer<typeof TeamSchema>;

export type TeamList = z.infer<typeof TeamListSchema>;

export type TeamWithMembers = z.infer<typeof TeamWithMembersSchema>;