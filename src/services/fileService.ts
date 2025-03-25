
import { supabase } from "@/integrations/supabase/client";

// Upload a music file
export const uploadMusic = async (file: File, userId: string, releaseId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${releaseId}/music.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('music')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from('music')
      .getPublicUrl(data.path);
    
    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error('Error uploading music file:', error);
    return { success: false, error };
  }
};

// Upload artwork
export const uploadArtwork = async (file: File, userId: string, releaseId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${releaseId}/artwork.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('artwork')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from('artwork')
      .getPublicUrl(data.path);
    
    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error('Error uploading artwork file:', error);
    return { success: false, error };
  }
};

// Download a file
export const downloadFile = async (url: string) => {
  try {
    // Extract the path from the URL
    const urlObj = new URL(url);
    const path = urlObj.pathname.split('/').slice(2).join('/');
    
    // Determine the bucket from the URL
    const bucket = url.includes('/artwork/') ? 'artwork' : 'music';
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error downloading file:', error);
    return { success: false, error };
  }
};
