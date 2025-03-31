import { z } from 'zod';

// Базовые схемы
export const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export const SuccessResponseSchema = z.object({
  status: z.literal('success'),
});

export const ErrorResponseSchema = z.object({
  status: z.literal('error'),
  error: ErrorSchema, 
});

// Схемы команды
export const TeamCreateSchema = z.object({
  name: z.string().min(3, 'Название команды должно содержать минимум 3 символа'),
  description: z.string().optional(),
  hackathon_id: z.number(),
  is_open: z.boolean(),
});

export const TeamUpdateSchema = TeamCreateSchema.partial();

export const MemberInfoSchema = z.object({
  id: z.number(),
  team_id: z.number(),
  user_id: z.number(),
  role: z.string(),
  tg_name: z.string(),
});

export const TeamInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  hackathon_id: z.number(),
  is_open: z.boolean(),
});

export const TeamWithMembersSchema = z.object({
  team: TeamInfoSchema,
  members: z.array(MemberInfoSchema),
});

export const TeamsSchema = z.array(TeamInfoSchema);

// Схемы пользователя
export const UserSchema = z.object({
  telegram_id: z.number(),
  username: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
});

export const UserRegistrationSchema = z.object({
  full_name: z.string().min(3, 'Имя должно содержать минимум 3 символа'),
  is_mirea_student: z.boolean(),
  group: z.string().optional(),
}).refine((data) => {
  if (data.is_mirea_student && !data.group) {
    return false;
  }
  return true;
}, {
  message: 'Для студентов МИРЭА необходимо указать группу',
  path: ['group'],
});

export const UserCheckRegistrationSchema = z.object({
  is_registered: z.boolean(),
});

export const ProfileInfoSchema = z.object({
  user: UserSchema,
  teams: z.array(TeamInfoSchema),
});

// Схемы хакатона
export const HackathonInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  start_description: z.string(),
  description: z.string(),
  max_members: z.number(),
  start_date: z.number().nullable(),
  end_date: z.number().nullable(),
});

export const HackathonSchema = z.object({
  id: z.number(),
  name: z.string(),
  start_description: z.string()
});

export const HackathonsSchema = z.array(HackathonSchema);

export const InviteCreateSchema = z.object({
  team_id: z.number(),
  invite_user_id: z.number(),
});


// Типы
export type Error = z.infer<typeof ErrorSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

export type UserCheckRegistration = z.infer<typeof UserCheckRegistrationSchema>;
export type UserRegistrationForm = z.infer<typeof UserRegistrationSchema>;
export type UserInfo = z.infer<typeof UserSchema>;
export type ProfileInfo = z.infer<typeof ProfileInfoSchema>;

export type Hackathons = z.infer<typeof HackathonsSchema>;
export type Hackathon = z.infer<typeof HackathonSchema>;
export type HackathonInfo = z.infer<typeof HackathonInfoSchema>;

export type Teams = z.infer<typeof TeamsSchema>;
export type TeamInfo = z.infer<typeof TeamInfoSchema>;
export type TeamWithMembers = z.infer<typeof TeamWithMembersSchema>;
export type TeamCreate = z.infer<typeof TeamCreateSchema>;
export type TeamUpdate = z.infer<typeof TeamUpdateSchema>;

export type MemberInfo = z.infer<typeof MemberInfoSchema>;
export type InviteCreate = z.infer<typeof InviteCreateSchema>;