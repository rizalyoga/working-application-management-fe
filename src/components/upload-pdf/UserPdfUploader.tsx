import React from "react";
import { PdfUpload } from "./PdfUpload";
import { usePdfUpload } from "@/hooks/usePDFUpload";

interface UserPdfUploaderProps {
  className?: string;
}

export const UserPdfUploader: React.FC<UserPdfUploaderProps> = ({
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
  } = usePdfUpload();

  // Use either the preview file or the initial PDF URL
  const displayPdfUrl = previewFile?.relativePath || "";

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
