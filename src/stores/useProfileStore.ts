import { create } from "zustand";

interface UserProfileInterface {
  name: string;
  email: string;
  phone_number: string;
  profile_picture_url: string;
  resume_url: string;
}

type Action = {
  updateName: (name: UserProfileInterface["name"]) => void;
  updateEmail: (email: UserProfileInterface["email"]) => void;
  updatePhoneNumber: (
    phone_number: UserProfileInterface["phone_number"]
  ) => void;
  updateProfilePictureUrl: (
    profile_picture_url: UserProfileInterface["profile_picture_url"]
  ) => void;
  updateResumeUrl: (resule_url: UserProfileInterface["resume_url"]) => void;
};

const useProfileUserStore = create<UserProfileInterface & Action>((set) => ({
  name: "",
  email: "",
  phone_number: "",
  profile_picture_url: "",
  resume_url: "",

  // action
  updateName: (name) => set(() => ({ name: name })),
  updateEmail: (email) => set(() => ({ email: email })),
  updatePhoneNumber: (phone_number) =>
    set(() => ({ phone_number: phone_number })),
  updateProfilePictureUrl: (profile_picture_url) =>
    set(() => ({ profile_picture_url: profile_picture_url })),
  updateResumeUrl: (resume_url) => set(() => ({ resume_url: resume_url })),
}));

export default useProfileUserStore;
