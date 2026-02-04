import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email("Błędny adres email"),
  password: z.string().min(1, { message: "To pole nie może być puste" }),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;
