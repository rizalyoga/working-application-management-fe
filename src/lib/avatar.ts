import { FileRejection } from "@/types/avatar";

/**
 * Maximum file size allowed for avatar uploads (1MB)
 */
export const MAX_AVATAR_SIZE = 1024 * 1024; // 1MB

/**
 * Validate file size and type for avatar upload
 */
export const validateFile = (
  file: File
): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_AVATAR_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum limit of 1MB (Current size: ${formatFileSize(
        file.size
      )})`,
    };
  }

  // Check file type
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "File must be an image (JPEG, PNG, GIF, or WEBP)",
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
export const processRejections = (fileRejections: FileRejection[]): string => {
  if (!fileRejections.length) return "";

  const rejection = fileRejections[0];
  const file = rejection.file;

  // Check file size first
  if (file.size > MAX_AVATAR_SIZE) {
    return `File size exceeds maximum limit of 1MB (Current size: ${formatFileSize(
      file.size
    )})`;
  }

  // Return the first error message if not a size issue
  return rejection.errors[0].message;
};

/**
 * Create a temporary URL for the selected file for preview
 */
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Clean up the preview URL when it's no longer needed
 */
export const revokePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};
