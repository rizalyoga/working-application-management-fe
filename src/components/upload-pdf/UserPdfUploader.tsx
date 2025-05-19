import React from "react";
import { PdfUpload } from "./PdfUpload";
import { usePdfUpload } from "@/hooks/usePDFUpload";
import useProfileUserStore from "@/stores/useProfileStore";

interface UserPdfUploaderProps {
  className?: string;
}

export const UserPdfUploader: React.FC<UserPdfUploaderProps> = ({
  className,
}) => {
  const userProfileStore = useProfileUserStore();
  const {
    previewFile,
    handleFileSelect,
    handleDelete,
    handleSave,
    isUploading,
    isDeleting,
    error,
  } = usePdfUpload();

  // Use either the preview file or the initial PDF URL
  const displayPdfUrl = previewFile?.preview || userProfileStore.resume_url;

  // Convert error to string if it exists
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : String(error)
    : null;

  return (
    <div className={className}>
      <PdfUpload
        pdfUrl={displayPdfUrl}
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
