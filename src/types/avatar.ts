export interface AvatarFile extends File {
  preview: string;
}

export interface AvatarUploadProps {
  avatarUrl?: string | null;
  onUpload: (file: File) => void;
  onDelete: () => void;
  onSave: () => void;
  isLoading?: boolean;
  isDeleting?: boolean;
  error?: string | null;
}

export interface AvatarPreviewProps {
  file?: AvatarFile | null;
  avatarUrl?: string | null;
  onOpenFileDialog: () => void;
  isLoading?: boolean;
}

export type FileRejection = {
  file: File;
  errors: Array<{
    code: string;
    message: string;
  }>;
};
