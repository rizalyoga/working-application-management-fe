import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AvatarFile } from "@/types/avatar";
import { toast } from "sonner";
import { validateFile, createPreviewUrl, revokePreviewUrl } from "@/lib/avatar";
import { fetchAPIWithFormData } from "@/lib/API/fetchFormData";
import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";
import useProfileUserStore from "@/stores/useProfileStore";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const uploadAvatar = async (file: File): Promise<APIResponse> => {
  const formData = new FormData();
  formData.append("profile_picture", file);

  return await fetchAPIWithFormData<APIResponse>(
    `${BASE_URL}/user/profile-picture`,
    "PUT",
    true,
    {
      body: formData,
    }
  );
};

// Example API function to delete avatar
const deleteAvatar = async (): Promise<APIResponse> => {
  return await fetchAPI<APIResponse>(
    `${BASE_URL}/user/profile-picture`,
    "DELETE",
    true
  );
};

export const useAvatarUpload = () => {
  const queryClient = useQueryClient();
  const userProfileStore = useProfileUserStore();
  const [previewFile, setPreviewFile] = useState<AvatarFile | null>(null);

  // Upload mutation
  const {
    mutate: upload,
    isPending: isUploading,
    error: uploadError,
  } = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: async (data) => {
      // Invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: ["photo_profile"] });
      toast("Success! 🥰", {
        description: data.message,
      });
      userProfileStore.updateProfilePictureUrl(data.data.profile_picture_url);

      // Clean up the preview file
      if (previewFile) {
        revokePreviewUrl(previewFile.preview);
        setPreviewFile(null);
      }
    },
    onError: (error) => {
      toast("Error", {
        description:
          error instanceof Error ? error.message : "Failed to upload avatar",
      });
    },
  });

  // Delete mutation
  const {
    mutate: remove,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteAvatar,
    onSuccess: async (data: APIResponse) => {
      // Invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: ["photo_profile"] });
      toast("Success! 🥰", {
        description: data.message,
      });

      userProfileStore.updateProfilePictureUrl(data.data.profile_picture_url);

      // Clean up the preview file
      if (previewFile) {
        revokePreviewUrl(previewFile.preview);
        setPreviewFile(null);
      }
    },
    onError: (error) => {
      toast("Error", {
        description:
          error instanceof Error ? error.message : "Failed to delete avatar",
      });
    },
  });

  // Handle file selection
  const handleFileSelect = (file: File) => {
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      toast("Invalid file", {
        description: validation.error,
      });
      return;
    }

    // Clean up previous preview if exists
    if (previewFile) {
      revokePreviewUrl(previewFile.preview);
    }

    // Create preview
    const preview = createPreviewUrl(file);
    const avatarFile = Object.assign(file, { preview }) as AvatarFile;

    // Update state
    setPreviewFile(avatarFile);
  };

  // Handle save
  const handleSave = () => {
    if (previewFile) {
      upload(previewFile);
    }
  };

  // Handle avatar deletion
  const handleDelete = () => {
    // Clean up preview if exists
    if (previewFile) {
      revokePreviewUrl(previewFile.preview);
      setPreviewFile(null);
    }

    // Call delete API
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
