
import React, { useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormData {
  artistName: string;
  songTitle: string;
  genre: string;
  releaseDate: string;
  email: string;
  bio: string;
  socialLinks: string;
  file: File | null;
  coverArt: File | null;
}

export const SubmissionForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    artistName: '',
    songTitle: '',
    genre: '',
    releaseDate: '',
    email: '',
    bio: '',
    socialLinks: '',
    file: null,
    coverArt: null,
  });
  
  const musicFileRef = useRef<HTMLInputElement>(null);
  const coverArtRef = useRef<HTMLInputElement>(null);
  
  const [musicDragging, setMusicDragging] = useState(false);
  const [coverDragging, setCoverDragging] = useState(false);
  
  const [musicFilePreview, setMusicFilePreview] = useState<string | null>(null);
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, file }));
      
      // Create a preview URL for audio file
      setMusicFilePreview(URL.createObjectURL(file));
    }
  };
  
  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, coverArt: file }));
      
      // Create a preview URL for image
      setCoverArtPreview(URL.createObjectURL(file));
    }
  };
  
  const handleMusicDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setMusicDragging(true);
  };
  
  const handleMusicDragLeave = () => {
    setMusicDragging(false);
  };
  
  const handleMusicDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setMusicDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/')) {
        setFormData(prev => ({ ...prev, file }));
        setMusicFilePreview(URL.createObjectURL(file));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleCoverDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverDragging(true);
  };
  
  const handleCoverDragLeave = () => {
    setCoverDragging(false);
  };
  
  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, coverArt: file }));
        setCoverArtPreview(URL.createObjectURL(file));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file for cover art",
          variant: "destructive"
        });
      }
    }
  };
  
  const nextStep = () => {
    if (step === 1 && (!formData.artistName || !formData.songTitle || !formData.email)) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && !formData.file) {
      toast({
        title: "Missing file",
        description: "Please upload your music file",
        variant: "destructive"
      });
      return;
    }
    
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file || !formData.artistName || !formData.songTitle || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating sending data to a backend service
    setTimeout(() => {
      // In a real app, this would be an API call to your backend
      console.log("Form data submitted:", formData);
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      toast({
        title: "Submission successful!",
        description: "We've received your music submission and will review it soon.",
      });
    }, 2000);
  };
  
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center max-w-md mx-auto animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Submission Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for submitting your music. Our team will review it and get back to you via email 
          at {formData.email} within 3-5 business days.
        </p>
        <Button onClick={() => {
          setSubmitted(false);
          setStep(1);
          setFormData({
            artistName: '',
            songTitle: '',
            genre: '',
            releaseDate: '',
            email: '',
            bio: '',
            socialLinks: '',
            file: null,
            coverArt: null,
          });
          setMusicFilePreview(null);
          setCoverArtPreview(null);
        }} variant="outline">
          Submit Another Track
        </Button>
      </div>
    );
  }
  
  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-xl animate-scale-in bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Progress bar */}
        <div className="bg-gray-100 w-full h-1">
          <div 
            className="bg-black h-full transition-all duration-500 ease-in-out"
            style={{ width: `${step * 33.33}%` }}
          ></div>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            <div className={cn("space-y-6 transition-all duration-500", step === 1 ? "block" : "hidden")}>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Artist & Track Information</h2>
                <p className="text-gray-600">Let us know about you and your music</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="artistName">Artist Name *</Label>
                  <Input 
                    id="artistName" 
                    name="artistName" 
                    value={formData.artistName} 
                    onChange={handleInputChange} 
                    required 
                    className="focus:ring-2 focus:ring-black/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="songTitle">Song Title *</Label>
                  <Input 
                    id="songTitle" 
                    name="songTitle" 
                    value={formData.songTitle} 
                    onChange={handleInputChange} 
                    required 
                    className="focus:ring-2 focus:ring-black/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input 
                    id="genre" 
                    name="genre" 
                    value={formData.genre} 
                    onChange={handleInputChange} 
                    className="focus:ring-2 focus:ring-black/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input 
                    id="releaseDate" 
                    name="releaseDate" 
                    type="date" 
                    value={formData.releaseDate} 
                    onChange={handleInputChange} 
                    className="focus:ring-2 focus:ring-black/20"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    className="focus:ring-2 focus:ring-black/20"
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll use this to contact you about your submission</p>
                </div>
              </div>
            </div>
            
            {/* Step 2: File Upload */}
            <div className={cn("space-y-6 transition-all duration-500", step === 2 ? "block" : "hidden")}>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Upload Your Music</h2>
                <p className="text-gray-600">We accept MP3, WAV, AIFF formats</p>
              </div>
              
              <div 
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer hover:bg-gray-50",
                  musicDragging ? "border-black bg-gray-50" : "border-gray-300",
                  formData.file ? "bg-gray-50" : ""
                )}
                onDragOver={handleMusicDragOver}
                onDragLeave={handleMusicDragLeave}
                onDrop={handleMusicDrop}
                onClick={() => musicFileRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={musicFileRef}
                  className="hidden" 
                  accept="audio/*" 
                  onChange={handleMusicFileChange}
                />
                
                {formData.file ? (
                  <div className="py-4">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                    </div>
                    <p className="font-medium text-green-600 mb-1">File uploaded successfully!</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs mx-auto">{formData.file.name}</p>
                    
                    {musicFilePreview && (
                      <div className="mt-4">
                        <audio controls className="w-full">
                          <source src={musicFilePreview} type={formData.file.type} />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, file: null }));
                        setMusicFilePreview(null);
                      }}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <p className="font-medium mb-1">Drag and drop your audio file here</p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Maximum file size: 50MB. Supported formats: MP3, WAV, AIFF.
              </p>
            </div>
            
            {/* Step 3: Additional Information */}
            <div className={cn("space-y-6 transition-all duration-500", step === 3 ? "block" : "hidden")}>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Additional Details</h2>
                <p className="text-gray-600">Tell us more about you and your music</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Artist Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleInputChange} 
                    className="min-h-32 focus:ring-2 focus:ring-black/20"
                    placeholder="Tell us about yourself, your music style, and influences..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="socialLinks">Social Media Links</Label>
                  <Textarea 
                    id="socialLinks" 
                    name="socialLinks" 
                    value={formData.socialLinks} 
                    onChange={handleInputChange} 
                    className="min-h-20 focus:ring-2 focus:ring-black/20"
                    placeholder="Instagram, Twitter, Spotify, SoundCloud, etc..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Cover Art (Optional)</Label>
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 cursor-pointer hover:bg-gray-50",
                      coverDragging ? "border-black bg-gray-50" : "border-gray-300",
                      formData.coverArt ? "bg-gray-50" : ""
                    )}
                    onDragOver={handleCoverDragOver}
                    onDragLeave={handleCoverDragLeave}
                    onDrop={handleCoverDrop}
                    onClick={() => coverArtRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={coverArtRef}
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleCoverArtChange}
                    />
                    
                    {formData.coverArt ? (
                      <div className="py-4">
                        {coverArtPreview && (
                          <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden shadow-sm">
                            <img 
                              src={coverArtPreview} 
                              alt="Cover preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <p className="font-medium text-green-600 mb-1">Cover art uploaded!</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs mx-auto">{formData.coverArt.name}</p>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, coverArt: null }));
                            setCoverArtPreview(null);
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                        </div>
                        <p className="font-medium text-sm mb-1">Upload cover artwork</p>
                        <p className="text-xs text-gray-500">Recommended: 3000x3000px, JPG or PNG</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-black hover:bg-black/90 text-white px-8"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Music"
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
