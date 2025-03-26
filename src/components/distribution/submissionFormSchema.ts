
import * as z from 'zod';

export const formSchema = z.object({
  trackTitle: z.string().min(1, { message: "Track title is required" }),
  artistName: z.string().min(1, { message: "Artist name is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
  releaseDate: z.string().min(1, { message: "Release date is required" }),
  description: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
