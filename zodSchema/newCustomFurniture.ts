import { z } from "zod";

import { ProjectThemes, RoomTypes } from "@/enums";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const NewCustomFurnitureSchema = z.object({
  title: z.string().min(3, "Tytuł musi mieć min. 3 znaki"),
  theme: z.enum([ProjectThemes.LIGHT, ProjectThemes.DARK], {
    message: "Wybierz motyw projektu",
  }),
  description: z.string().min(10, "Opis powinien być nieco dłuższy"),
  images: z
    .array(z.instanceof(File))
    .min(1, "Dodaj przynajmniej jedno zdjęcie")
    .max(10, "Możesz dodać maksymalnie 10 zdjęć")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Maksymalny rozmiar zdjęcia to 5MB`,
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Dozwolone formaty to .jpg, .jpeg, .png oraz .webp",
    ),
  roomType: z.enum(
    [
      RoomTypes.KITCHEN,
      RoomTypes.LIVING_ROOM,
      RoomTypes.BEDROOM,
      RoomTypes.BATHROOM,
      RoomTypes.OFFICE,
    ],
    {
      message: "Wybierz typ pomieszczenia",
    },
  ),
});

export type NewCustomFurnitureSchemaType = z.infer<
  typeof NewCustomFurnitureSchema
>;
