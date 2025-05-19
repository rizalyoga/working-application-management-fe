import { FileRejection } from "@/types/avatar";

/**
 * Maximum file size allowed for PDF uploads (2MB)
 */
export const MAX_PDF_SIZE = 2 * 1024 * 1024; // 2MB

/**
 * Validate file size and type for PDF upload
 */
export const validatePdfFile = (
  file: File
): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_PDF_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum limit of 2MB (Current size: ${formatFileSize(
        file.size
      )})`,
    };
  }

  // Check file type
  if (file.type !== "application/pdf") {
    return {
      valid: false,
      error: "File must be a PDF document",
    };
  }

  return { valid: true };
};

/**
 * Format file size in human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Process file rejection errors from react-dropzone
 */
export const processPdfRejections = (
  fileRejections: FileRejection[]
): string => {
  if (!fileRejections.length) return "";

  const rejection = fileRejections[0];
  const file = rejection.file;

  // Check file size first
  if (file.size > MAX_PDF_SIZE) {
    return `File size exceeds maximum limit of 2MB (Current size: ${formatFileSize(
      file.size
    )})`;
  }

  // Return the first error message if not a size issue
  return rejection.errors[0].message;
};
