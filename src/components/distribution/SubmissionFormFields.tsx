
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardContent, CardFooter } from '@/components/ui/card';
import FileUploader from '../FileUploader';

const formSchema = z.object({
  trackTitle: z.string().min(1, { message: "Track title is required" }),
  artistName: z.string().min(1, { message: "Artist name is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
  releaseDate: z.string().min(1, { message: "Release date is required" }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SubmissionFormFieldsProps {
  form: UseFormReturn<FormData>;
  userId: string;
  audioUrl: string;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  artworkUrl: string;
  setArtworkUrl: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
  onSubmit: (values: FormData) => Promise<void>;
}

const SubmissionFormFields: React.FC<SubmissionFormFieldsProps> = ({
  form,
  userId,
  audioUrl,
  setAudioUrl,
  artworkUrl,
  setArtworkUrl,
  isSubmitting,
  onSubmit
}) => {
  const genreOptions = [
    "Afrobeat",
    "Alternative",
    "Blues",
    "Classical",
    "Country",
    "Dance",
    "Electronic",
    "Folk",
    "Hip-Hop/Rap",
    "House",
    "Indie",
    "Jazz",
    "K-Pop",
    "Latin",
    "Metal",
    "Pop",
    "R&B/Soul",
    "Reggae",
    "Rock",
    "Singer-Songwriter",
    "World"
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="trackTitle">Track Title</Label>
          <Input
            id="trackTitle"
            {...form.register('trackTitle')}
            placeholder="e.g. My Amazing Song"
          />
          {form.formState.errors.trackTitle && (
            <p className="text-red-500 text-xs">{form.formState.errors.trackTitle.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="artistName">Artist Name</Label>
          <Input
            id="artistName"
            {...form.register('artistName')}
            placeholder="e.g. John Doe"
          />
          {form.formState.errors.artistName && (
            <p className="text-red-500 text-xs">{form.formState.errors.artistName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select
            onValueChange={(value) => form.setValue('genre', value)}
            defaultValue={form.getValues('genre')}
          >
            <SelectTrigger id="genre">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {genreOptions.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.genre && (
            <p className="text-red-500 text-xs">{form.formState.errors.genre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            type="date"
            {...form.register('releaseDate')}
          />
          {form.formState.errors.releaseDate && (
            <p className="text-red-500 text-xs">{form.formState.errors.releaseDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            {...form.register('description')}
            placeholder="Tell us about your track"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audioFile">Audio File</Label>
          <FileUploader
            bucketId="music_files"
            userId={userId}
            folderPath={`audio/${Date.now()}`}
            acceptFileTypes="audio/mpeg,audio/wav,audio/mp3"
            maxFileSizeMB={50}
            onFileUploaded={setAudioUrl}
            buttonText="Upload Music File"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="artworkFile">Cover Artwork</Label>
          <FileUploader
            bucketId="music_files"
            userId={userId}
            folderPath={`artwork/${Date.now()}`}
            acceptFileTypes="image/jpeg,image/png,image/jpg"
            maxFileSizeMB={10}
            onFileUploaded={setArtworkUrl}
            buttonText="Upload Artwork (3000x3000px recommended)"
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit for Distribution'
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export { formSchema };
export type { FormData };
export default SubmissionFormFields;
