import React from "react";
import { AvatarUpload } from "./AvatarUpload";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";

interface UserAvatarUploaderProps {
  initialAvatarUrl?: string | null;
  className?: string;
}

export const UserAvatarUploader: React.FC<UserAvatarUploaderProps> = ({
  initialAvatarUrl,
  className,
}) => {
  const {
    previewFile,
    handleFileSelect,
    handleDelete,
    handleSave,
    isUploading,
    isDeleting,
    error,
  } = useAvatarUpload();

  // Use either the preview file or the initial avatar URL
  const displayAvatarUrl = previewFile?.preview || initialAvatarUrl;

  // Convert error to string if it exists
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : String(error)
    : null;

  return (
    <div className={className}>
      <AvatarUpload
        avatarUrl={displayAvatarUrl}
        onUpload={handleFileSelect}
        onDelete={handleDelete}
        onSave={handleSave}
        isLoading={isUploading}
        isDeleting={isDeleting}
        error={errorMessage}
      />
    </div>
  );
};
