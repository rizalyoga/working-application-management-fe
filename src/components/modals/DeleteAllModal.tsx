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
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAllModal = ({ isOpen, onClose }: DeleteModalProps) => {
  const queryClient = useQueryClient();

  // Fungsi untuk menghapus job application
  const deleteAllJobApplication = async () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    return await fetchAPI<{ message: string }>(
      `${BASE_URL}/job-applications/all-job`,
      "DELETE",
      true
    );
  };

  // Mutasi untuk mengirim permintaan hapus
  const mutation = useMutation({
    mutationFn: deleteAllJobApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      toast(`${data.message}! 🥰`, {
        position: "bottom-right",
      });
      onClose(); // Tutup modal setelah sukses
    },
    onError: (error) => {
      toast(`Failed to delete the application!  😢`, {
        description: error.message,
        position: "bottom-right",
      });
      console.error("Failed to delete the application:", error);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-left hidden">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete All Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete all application data? This action
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

export default DeleteAllModal;
