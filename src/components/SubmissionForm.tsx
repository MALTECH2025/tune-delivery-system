import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import SubmissionFormFields from './distribution/SubmissionFormFields';
import { formSchema, FormData } from './distribution/submissionFormSchema';

const SubmissionForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackTitle: "",
      artistName: user?.name || "",
      genre: "",
      releaseDate: new Date().toISOString().split('T')[0],
      description: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    if (!audioUrl) {
      toast({
        title: "Missing Audio File",
        description: "Please upload your music file",
        variant: "destructive",
      });
      return;
    }

    if (!artworkUrl) {
      toast({
        title: "Missing Artwork",
        description: "Please upload your cover artwork",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert the release data into the database
      const { data, error } = await supabase
        .from('releases')
        .insert({
          user_id: user?.id,
          track_title: values.trackTitle,
          artist_name: values.artistName,
          genre: values.genre,
          release_date: values.releaseDate,
          description: values.description,
          audio_url: audioUrl,
          artwork_url: artworkUrl,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Submission successful",
        description: "Your music has been submitted for review.",
      });

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (error: any) {
      console.error('Error submitting release:', error);
      toast({
        title: "Submission failed",
        description: error.message || "An error occurred while submitting your music.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Music</CardTitle>
      </CardHeader>
      <SubmissionFormFields
        form={form}
        userId={user?.id || ''}
        audioUrl={audioUrl}
        setAudioUrl={setAudioUrl}
        artworkUrl={artworkUrl}
        setArtworkUrl={setArtworkUrl}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </Card>
  );
};

export default SubmissionForm;
