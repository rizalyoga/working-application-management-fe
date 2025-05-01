// Fungsi untuk memformat status badge
export const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "apply":
      return "bg-lime-500";
    case "screening":
      return "bg-blue-400";
    case "interview hr":
      return "bg-sky-400";
    case "interview hr ii":
      return "bg-sky-400";
    case "interview user":
      return "bg-purple-400";
    case "interview user ii":
      return "bg-purple-400";
    case "interview c level":
      return "bg-orange-400";
    case "interview c level ii":
      return "bg-orange-500";
    case "reject":
      return "bg-red-400";
    case "success":
      return "bg-emerald-500";
    default:
      return "outline";
  }
};
