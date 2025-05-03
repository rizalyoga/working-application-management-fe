import { create } from "zustand";

interface ModalDialogInterface {
  isModalDialogOpen: boolean;
  typeModalDialog: string;
}

type Action = {
  updateTypeModalDialog: (
    typeModalDialog: ModalDialogInterface["typeModalDialog"]
  ) => void;
  updateIsModalDialogOpen: (isOpen: boolean) => void;
};

const useModalDialogStore = create<ModalDialogInterface & Action>((set) => ({
  isModalDialogOpen: false,
  typeModalDialog: "",

  // Perbaiki fungsi ini, terima parameter boolean
  updateIsModalDialogOpen: (isOpen: boolean) =>
    set(() => ({ isModalDialogOpen: isOpen })),

  updateTypeModalDialog: (typeModal: string) =>
    set(() => ({ typeModalDialog: typeModal })),
}));

export default useModalDialogStore;
