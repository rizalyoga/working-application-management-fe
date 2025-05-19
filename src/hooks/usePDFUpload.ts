import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PdfFile } from "@/types/pdf";
import { toast } from "sonner";
import { validatePdfFile } from "@/lib/upload-pdf";
import { fetchAPIWithFormData } from "@/lib/API/fetchFormData";
import { APIResponse } from "@/types/API-types";
import { fetchAPI } from "@/lib/API/auth";
import useProfileUserStore from "@/stores/useProfileStore";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// Example API function to update PDF
const uploadPdf = async (file: File): Promise<APIResponse> => {
  const formData = new FormData();
  formData.append("resume", file);

  return await fetchAPIWithFormData<APIResponse>(
    `${BASE_URL}/user/post-resume`,
    "POST",
    true,
    {
      body: formData,
    }
  );
};

// Example API function to delete PDF
const deletePdf = async (): Promise<APIResponse> => {
  return await fetchAPI<APIResponse>(
    `${BASE_URL}/user/delete-resume`,
    "DELETE",
    true
  );
};

export const usePdfUpload = () => {
  const queryClient = useQueryClient();
  const [previewFile, setPreviewFile] = useState<PdfFile | null>(null);
  const userProfileStore = useProfileUserStore();
  const { updateResumeUrl } = userProfileStore;

  // Upload mutation
  const {
    mutate: upload,
    isPending: isUploading,
    error: uploadError,
  } = useMutation({
    mutationFn: uploadPdf,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["resume"] });
      toast("PDF uploaded successfully 🥰", {
        description: data.message,
      });
      updateResumeUrl(data.data.resume_url);

      if (previewFile) {
        URL.revokeObjectURL(previewFile.preview);
        setPreviewFile(null);
      }
    },
    onError: (error) => {
      console.log(error);

      toast("Failed to upload PDF", {
        description:
          error instanceof Error ? error.message : "Failed to upload PDF",
      });
    },
  });

  // Delete mutation
  const {
    mutate: remove,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deletePdf,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["resume"] });
      toast("PDF removed successfully 🥰", {
        description: data.message,
      });
      updateResumeUrl("");

      if (previewFile) {
        URL.revokeObjectURL(previewFile.preview);
        setPreviewFile(null);
      }
    },
    onError: (error) => {
      toast("Failed to delete PDF", {
        description:
          error instanceof Error ? error.message : "Failed to delete PDF",
      });
    },
  });

  // Handle file selection
  const handleFileSelect = (file: File) => {
    const validation = validatePdfFile(file);
    if (!validation.valid) {
      toast("Invalid file", {
        description: validation.error,
      });
      return;
    }

    if (previewFile) {
      URL.revokeObjectURL(previewFile.preview);
    }

    const preview = URL.createObjectURL(file);
    const pdfFile = Object.assign(file, { preview }) as PdfFile;

    setPreviewFile(pdfFile);
  };

  // Handle save
  const handleSave = () => {
    if (previewFile) {
      upload(previewFile);
    }
  };

  // Handle PDF deletion
  const handleDelete = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.preview);
      setPreviewFile(null);
      return;
    }

    remove();
  };

  return {
    previewFile,
    setPreviewFile,
    handleFileSelect,
    handleDelete,
    handleSave,
    isUploading,
    isDeleting,
    error: uploadError || deleteError,
  };
};
