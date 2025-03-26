
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  bucketId: string;
  folderPath: string;
  onFileUploaded?: (fileUrl: string, filePath: string) => void;
  acceptFileTypes?: string;
  maxFileSizeMB?: number;
  userId: string;
  buttonText?: string;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  bucketId,
  folderPath,
  onFileUploaded,
  acceptFileTypes = "image/*,audio/*",
  maxFileSizeMB = 20,
  userId,
  buttonText = "Upload File",
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    // Reset progress
    setUploadProgress(0);
    
    // Validate file size
    const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `File exceeds ${maxFileSizeMB}MB limit.`,
        variant: "destructive",
      });
      return;
    }
    
    // Start upload
    setIsUploading(true);
    
    try {
      // Create full path including user ID for better organization
      const filePath = `${userId}/${folderPath}/${file.name}`;
      
      // Upload file to Supabase Storage - without onUploadProgress since it's not in the type definition
      const { data, error } = await supabase.storage
        .from(bucketId)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) throw error;
      
      // Simulate progress since we can't use onUploadProgress
      setUploadProgress(100);
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketId)
        .getPublicUrl(filePath);
      
      // Notify parent component
      if (onFileUploaded) {
        onFileUploaded(publicUrl, filePath);
      }
      
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded.",
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="file-upload" className="text-sm font-medium">
          {buttonText}
        </Label>
        
        <Button
          type="button"
          onClick={handleButtonClick}
          variant="outline"
          disabled={isUploading}
          className="flex gap-2"
        >
          <Upload size={16} />
          {isUploading ? 'Uploading...' : buttonText}
        </Button>
        
        <Input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept={acceptFileTypes}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {isUploading && (
          <div className="mt-2">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">
              {uploadProgress}% uploaded
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
