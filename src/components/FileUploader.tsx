
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Check, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FileUploaderProps {
  bucketId: string;
  userId: string;
  folderPath: string;
  acceptedFileTypes: string;
  maxSizeMB: number;
  onFileUploaded: (url: string) => void;
  existingFileUrl?: string;
  label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  bucketId, 
  userId, 
  folderPath, 
  acceptedFileTypes, 
  maxSizeMB, 
  onFileUploaded,
  existingFileUrl,
  label = 'Upload File'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | null>(existingFileUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      toast({
        title: "Upload Error",
        description: `File size exceeds ${maxSizeMB}MB limit`,
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const fileTypes = acceptedFileTypes.split(',');
    const isAcceptedType = fileTypes.some(type => 
      file.type === type.trim() || 
      file.name.endsWith(type.trim().replace('*', ''))
    );

    if (!isAcceptedType) {
      setError(`File type not accepted. Please upload ${acceptedFileTypes}`);
      toast({
        title: "Upload Error",
        description: `File type not accepted. Please upload ${acceptedFileTypes}`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      // Create full path including user ID for better organization
      const filePath = `${userId}/${folderPath}/${file.name}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketId)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            setUploadProgress(percent);
          }
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketId)
        .getPublicUrl(filePath);
      
      setFileUrl(urlData.publicUrl);
      onFileUploaded(urlData.publicUrl);
      
      toast({
        title: "Upload Successful",
        description: "File has been uploaded successfully",
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      setError(error.message);
      toast({
        title: "Upload Failed",
        description: error.message || "An error occurred during upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFileUrl(null);
    onFileUploaded('');
  };

  return (
    <div className="w-full">
      {!fileUrl ? (
        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${error ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'}`}>
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</span>
            <span className="text-xs text-gray-500 dark:text-gray-500 mb-2">
              {acceptedFileTypes.split(',').join(', ')} (Max: {maxSizeMB}MB)
            </span>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            {isUploading ? (
              <div className="mt-2 w-full">
                <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-500 h-full rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
              </div>
            ) : (
              <Button variant="outline" size="sm" className="mt-2" disabled={isUploading}>
                Select File
              </Button>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept={acceptedFileTypes} 
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      ) : (
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm truncate max-w-xs">
              {fileUrl.split('/').pop()}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
