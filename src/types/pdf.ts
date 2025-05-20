export interface PdfFile extends File {
  preview: string;
  relativePath?: string;
  path?: string;
}

export interface PdfUploadProps {
  pdfUrl?: string | null;
  onUpload: (file: File) => void;
  onDelete: () => void;
  onSave: () => void;
  isLoading?: boolean;
  isDeleting?: boolean;
  error?: string | null;
}

export interface PdfPreviewProps {
  file?: PdfFile | null;
  pdfUrl?: string | null;
  onOpenFileDialog: () => void;
  isLoading?: boolean;
}
