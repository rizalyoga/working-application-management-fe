import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Upload, Save, FolderOpen } from "lucide-react";
import {
  MAX_PDF_SIZE,
  processPdfRejections,
  validatePdfFile,
} from "@/lib/upload-pdf";
import { PdfUploadProps } from "@/types/pdf";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useProfileUserStore from "@/stores/useProfileStore";

export const PdfUpload: React.FC<PdfUploadProps> = ({
  pdfUrl,
  onUpload,
  onDelete,
  onSave,
  isLoading = false,
  isDeleting = false,
  error = null,
}) => {
  const [isModified, setIsModified] = useState(false);
  const profileUserStore = useProfileUserStore();
  const { resume_url } = profileUserStore;

  // Handle the file drop
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const errorMessage = processPdfRejections(rejectedFiles);
        toast("Error", {
          description: errorMessage,
        });
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const validation = validatePdfFile(file);

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
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_PDF_SIZE,
    multiple: false,
    noClick: true,
    noKeyboard: true,
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

  // Handle delete
  const handleDeleteClick = useCallback(() => {
    onDelete();
    setIsModified(false);
  }, [onDelete]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "w-full max-w-md h-32 border-2 border-dashed rounded-lg flex items-center justify-center transition-all duration-300",
          isDragActive ? "border-primary bg-primary/5" : "border-border",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />

        <div className="text-center p-4">
          <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          {pdfUrl ? (
            <p className="text-sm text-muted-foreground">{pdfUrl}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF here"}
            </p>
          )}
        </div>

        {isDragActive && (
          <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={openFileDialog}
          disabled={isLoading || isDeleting}
          className="flex items-center gap-1"
        >
          <FolderOpen className="h-3.5 w-3.5 mr-1" />
          <span>Select File</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveClick}
          disabled={!isModified || isLoading || isDeleting}
          className="flex items-center gap-1 text-primary hover:text-primary"
        >
          <Save className="h-3.5 w-3.5 mr-1" />
          <span>{isLoading ? "Save..." : "Save"}</span>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={!resume_url || isLoading || isDeleting}
              className="flex items-center gap-1 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              <span>Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete PDF Document</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this PDF document? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteClick}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
