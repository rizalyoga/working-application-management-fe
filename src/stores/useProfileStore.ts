import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

interface UserProfileInterface {
  userID: string;
  name: string;
  email: string;
  phone_number: string;
  profile_picture_url: string;
  resume_url: string;
  is_loading: boolean;
}

type Action = {
  updateID: (id: UserProfileInterface["userID"]) => void;
  updateName: (name: UserProfileInterface["name"]) => void;
  updateEmail: (email: UserProfileInterface["email"]) => void;
  updatePhoneNumber: (
    phone_number: UserProfileInterface["phone_number"]
  ) => void;
  updateProfilePictureUrl: (
    profile_picture_url: UserProfileInterface["profile_picture_url"]
  ) => void;
  updateResumeUrl: (resume_url: UserProfileInterface["resume_url"]) => void;
  updateIsLoading: (is_loading: UserProfileInterface["is_loading"]) => void;
};

// Gabungkan interface untuk state dan action
type ProfileStore = UserProfileInterface & Action;

// Definisikan opsi persist dengan tipe yang benar
type PersistProfileStore = PersistOptions<ProfileStore>;

const useProfileUserStore = create<ProfileStore>()(
  persist(
    (set) => ({
      userID: "",
      name: "",
      email: "",
      phone_number: "",
      profile_picture_url: "",
      resume_url: "",
      is_loading: false,

      // Action
      updateID: (userID) => set(() => ({ userID })),
      updateName: (name) => set(() => ({ name })),
      updateEmail: (email) => set(() => ({ email })),
      updatePhoneNumber: (phone_number) => set(() => ({ phone_number })),
      updateProfilePictureUrl: (profile_picture_url) =>
        set(() => ({ profile_picture_url })),
      updateResumeUrl: (resume_url) => set(() => ({ resume_url })),
      updateIsLoading: (is_loading) => set(() => ({ is_loading })),
    }),
    {
      name: "profile-storage", // Nama kunci di localStorage
      storage: createJSONStorage(() => localStorage), // Gunakan createJSONStorage untuk kompatibilitas
    } as PersistProfileStore
  )
);

export default useProfileUserStore;
