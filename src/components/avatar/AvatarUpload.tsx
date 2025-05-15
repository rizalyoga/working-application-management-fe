import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AvatarPreview } from "./AvatarPreview";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Upload, Save } from "lucide-react";
import { MAX_AVATAR_SIZE, processRejections, validateFile } from "@/lib/avatar";
import { AvatarUploadProps } from "@/types/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  onUpload,
  onDelete,
  onSave,
  isLoading = false,
  isDeleting = false,
  error = null,
}) => {
  const [isModified, setIsModified] = useState(false);

  // Handle the file drop
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const errorMessage = processRejections(rejectedFiles);
        toast("Error", {
          description: errorMessage,
        });
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const validation = validateFile(file);

        if (!validation.valid) {
          toast("Invalid file", {
            description: validation.error,
          });
          return;
        }

        onUpload(file);
        setIsModified(true);
      }
    },
    [onUpload]
  );

  // Set up dropzone configuration
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: MAX_AVATAR_SIZE,
    multiple: false,
    noClick: true, // We'll handle clicks manually
    noKeyboard: true, // We'll handle keyboard events manually
  });

  // Function to open the file dialog
  const openFileDialog = useCallback(() => {
    if (!isLoading && !isDeleting) {
      open();
    }
  }, [open, isLoading, isDeleting]);

  // Handle save click
  const handleSaveClick = useCallback(() => {
    onSave();
    setIsModified(false);
  }, [onSave]);

  // Handle delete with state reset
  const handleDeleteClick = useCallback(() => {
    onDelete();
    setIsModified(false);
  }, [onDelete]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-full transition-all duration-300",
          isDragActive && "ring-4 ring-primary/50"
        )}
      >
        <input {...getInputProps()} />

        {/* Avatar preview */}
        <AvatarPreview
          avatarUrl={avatarUrl}
          onOpenFileDialog={openFileDialog}
          isLoading={isLoading}
        />

        {/* Drag overlay */}
        {isDragActive && (
          <div className="absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center border-2 border-dashed border-primary">
            <div className="text-center p-2">
              <Upload className="h-6 w-6 text-primary mx-auto" />
              <span className="text-xs font-medium text-primary mt-1 block">
                Drop to upload
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Action buttons */}
      <div className="flex flex-col gap-4">
        <div className="flex  space-x-2">
          <Button
            variant="outline"
            size="default"
            onClick={openFileDialog}
            disabled={isLoading || isDeleting}
            className="flex items-center gap-1"
          >
            <Pencil className="h-3.5 w-3.5 mr-1" />
            <span>Edit</span>
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={handleDeleteClick}
            disabled={avatarUrl?.includes("github") || isLoading || isDeleting}
            className="flex items-center gap-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            <span>Delete</span>
          </Button>
        </div>

        <Button
          variant="default"
          size="default"
          onClick={handleSaveClick}
          disabled={!isModified || isLoading || isDeleting}
          className="flex items-center gap-1 text-primary-foreground"
        >
          <Save className="h-3.5 w-3.5 mr-1" />
          <span>Save</span>
        </Button>
      </div>
    </div>
  );
};
