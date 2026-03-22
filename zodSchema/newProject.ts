import { z } from "zod";

import { ProjectModules, ProjectThemes } from "@/enums";

export const NewProjectSchema = z.object({
  title: z.string().min(3, "Tytuł musi mieć min. 3 znaki"),
  projectModule: z.enum(
    [ProjectModules.VISUALISATION, ProjectModules.REALISATION],
    { message: "Wybierz moduł projektu" },
  ),
  theme: z.enum([ProjectThemes.LIGHT, ProjectThemes.DARK], {
    message: "Wybierz motyw projektu",
  }),
  description: z.string().min(10, "Opis powinien być nieco dłuższy"),
  images: z
    .any()
    .refine((files) => files?.length > 0, "Dodaj przynajmniej jedno zdjęcie"),
});

export type NewProjectSchemaType = z.infer<typeof NewProjectSchema>;
