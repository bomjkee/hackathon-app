import { z } from "zod";

export const HackathonSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    start_description: z.string(),
    max_members: z.number(),
    start_date: z.number(), 
    end_date: z.number()
});

export const HackathonsSchema = z.object({
    id: z.number(),
    name: z.string(),
    start_description: z.string(),
});

export const HackathonListSchema = z.array(HackathonsSchema);

export type Hackathon = z.infer<typeof HackathonSchema>;

export type Hackathons = z.infer<typeof HackathonsSchema>;

export type HackathonList = z.infer<typeof HackathonListSchema>;
