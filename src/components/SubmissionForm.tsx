
import React, { useState } from 'react';
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

const SubmissionForm = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    }
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
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
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
                        <SelectItem value="pop">Pop</SelectItem>
                        <SelectItem value="rock">Rock</SelectItem>
                        <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                        <SelectItem value="r-and-b">R&B</SelectItem>
                        <SelectItem value="dance">Dance/Electronic</SelectItem>
                        <SelectItem value="country">Country</SelectItem>
                        <SelectItem value="latin">Latin</SelectItem>
                        <SelectItem value="jazz">Jazz</SelectItem>
                        <SelectItem value="classical">Classical</SelectItem>
                        <SelectItem value="alternative">Alternative</SelectItem>
                        <SelectItem value="folk">Folk</SelectItem>
                        <SelectItem value="reggae">Reggae</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {audioFile.name}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
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
                {artworkFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {artworkFile.name}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
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
                    I agree to the terms and conditions of MalpinohDistro
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
