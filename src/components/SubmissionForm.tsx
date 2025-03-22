
import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlayCircle, PauseCircle, Image as ImageIcon } from "lucide-react";

const formSchema = z.object({
  artistName: z.string().min(2, { message: "Artist name must be at least 2 characters" }),
  trackTitle: z.string().min(2, { message: "Track title must be at least 2 characters" }),
  genre: z.string({ required_error: "Please select a genre" }),
  releaseDate: z.string().min(1, { message: "Please select a release date" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  // The file fields will be handled separately
  description: z.string().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const genres = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hip-hop", label: "Hip-Hop/Rap" },
  { value: "r-and-b", label: "R&B/Soul" },
  { value: "dance", label: "Dance/Electronic" },
  { value: "country", label: "Country" },
  { value: "latin", label: "Latin" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "alternative", label: "Alternative" },
  { value: "afrobeat", label: "Afrobeat" },
  { value: "afro-pop", label: "Afro-Pop" },
  { value: "gospel", label: "Gospel" },
  { value: "reggae", label: "Reggae" },
  { value: "metal", label: "Metal" },
  { value: "folk", label: "Folk" },
  { value: "blues", label: "Blues" },
  { value: "funk", label: "Funk" },
  { value: "indie", label: "Indie" },
  { value: "other", label: "Other" }
];

const SubmissionForm = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      trackTitle: "",
      genre: "",
      releaseDate: "",
      email: "",
      phoneNumber: "",
      description: "",
      termsAgreed: false,
    },
  });
  
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/flac'];
      const maxSize = 100 * 1024 * 1024; // 100MB
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file format",
          description: "Please upload MP3, WAV, or FLAC files only.",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Audio file must be less than 100MB.",
          variant: "destructive",
        });
        return;
      }
      
      setAudioFile(file);
      
      // Create audio preview URL
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
      const previewUrl = URL.createObjectURL(file);
      setAudioPreviewUrl(previewUrl);
      
      // Stop any current playback
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  
  const handleArtworkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid image format",
          description: "Please upload JPEG or PNG files only.",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Artwork must be less than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setArtworkFile(file);
      
      // Create artwork preview
      if (artworkPreview) {
        URL.revokeObjectURL(artworkPreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setArtworkPreview(previewUrl);
    }
  };
  
  const toggleAudioPlayback = () => {
    if (!audioRef.current || !audioPreviewUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!audioFile) {
      toast({
        title: "Missing audio file",
        description: "Please upload your music track.",
        variant: "destructive",
      });
      return;
    }
    
    if (!artworkFile) {
      toast({
        title: "Missing artwork",
        description: "Please upload cover artwork for your release.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form values:", values);
      console.log("Audio file:", audioFile);
      console.log("Artwork file:", artworkFile);
      
      // In a real application, you would send this data to your server
      // For now, we'll just show a success message
      toast({
        title: "Submission Received!",
        description: "We'll review your music and contact you soon.",
      });
      
      // Reset form
      form.reset();
      setAudioFile(null);
      setArtworkFile(null);
      setArtworkPreview(null);
      setAudioPreviewUrl(null);
      setIsPlaying(false);
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="bg-card rounded-xl shadow-md p-6 md:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Artist Information */}
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Artist Information</h3>
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
              </div>
              
              <FormField
                control={form.control}
                name="artistName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your stage name or band name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll use this email to contact you about your submission.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Track Information */}
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Track Information</h3>
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
              </div>
              
              <FormField
                control={form.control}
                name="trackTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Track Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of your song" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre.value} value={genre.value}>
                            {genre.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Release Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Allow at least 3 weeks from submission for processing.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* File Uploads */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
              <div className="h-1 w-20 bg-red-600 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="audio-file">Audio File (MP3, WAV, FLAC)</Label>
                <div className="mt-2">
                  <Input
                    id="audio-file"
                    type="file"
                    accept=".mp3,.wav,.flac"
                    onChange={handleAudioFileChange}
                  />
                </div>
                {audioFile && (
                  <div className="mt-4 p-4 border border-border rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="truncate">
                        <p className="font-medium truncate">{audioFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="ghost" 
                        className="ml-2"
                        onClick={toggleAudioPlayback}
                      >
                        {isPlaying ? (
                          <PauseCircle className="h-8 w-8 text-red-600" />
                        ) : (
                          <PlayCircle className="h-8 w-8 text-red-600" />
                        )}
                      </Button>
                    </div>
                    
                    {audioPreviewUrl && (
                      <audio
                        ref={audioRef}
                        src={audioPreviewUrl}
                        className="hidden"
                        onEnded={() => setIsPlaying(false)}
                      />
                    )}
                    
                    {isPlaying && (
                      <div className="audio-wave flex items-center justify-center mt-4">
                        <div className="animate-wave-1"></div>
                        <div className="animate-wave-2"></div>
                        <div className="animate-wave-3"></div>
                        <div className="animate-wave-1"></div>
                        <div className="animate-wave-2"></div>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  High quality audio files only. Maximum 100MB.
                </p>
              </div>
              
              <div>
                <Label htmlFor="artwork-file">Cover Artwork (JPEG, PNG)</Label>
                <div className="mt-2">
                  <Input
                    id="artwork-file"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleArtworkFileChange}
                  />
                </div>
                {artworkPreview ? (
                  <div className="mt-4">
                    <div className="relative w-full aspect-square max-w-[200px] mx-auto overflow-hidden rounded-lg border border-border">
                      <img 
                        src={artworkPreview} 
                        alt="Artwork preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 text-center">
                      Cover artwork preview
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 bg-muted flex items-center justify-center w-full aspect-square max-w-[200px] mx-auto rounded-lg border border-border">
                    <ImageIcon className="h-12 w-12 text-muted-foreground opacity-50" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Minimum 3000x3000 pixels. Square format required.
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us more about your music, featured artists, or any special instructions..." 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="termsAgreed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the terms and conditions of MALPINOHDistro
                  </FormLabel>
                  <FormDescription>
                    By submitting this form, you certify that you own all rights to this music.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Your Music"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubmissionForm;
