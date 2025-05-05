import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchAPI } from "@/lib/API/auth";
import { toast } from "sonner";

interface DeleteModalProps {
  jobApplicationId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteModal = ({
  jobApplicationId,
  isOpen,
  onClose,
}: DeleteModalProps) => {
  const queryClient = useQueryClient();

  // Fungsi untuk menghapus job application
  const deleteJobApplication = async () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    return await fetchAPI<{ message: string }>(
      `${BASE_URL}/job-applications/${jobApplicationId}`,
      "DELETE",
      true
    );
  };

  // Mutasi untuk mengirim permintaan hapus
  const mutation = useMutation({
    mutationFn: deleteJobApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      toast(`${data.message}! 🥰`, {
        position: "top-right",
      });
      onClose(); // Tutup modal setelah sukses
    },
    onError: (error) => {
      toast(`Gagal menghapus aplikasi!`, {
        description: error.message,
        position: "top-right",
      });
      console.error("Gagal menghapus aplikasi:", error);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full text-left">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this application data? This action
            cannot be canceled.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
