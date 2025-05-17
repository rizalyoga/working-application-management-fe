// Fungsi untuk memformat status badge
export const getStatusVariant = (status: string) => {
  switch (status?.toLowerCase()) {
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
    case "interview ceo":
      return "bg-emerald-500";
    case "reject":
      return "bg-red-400";
    case "success":
      return "bg-emerald-700";
    default:
      return "outline";
  }
};

export const STATUS_OPTIONS = [
  { All: "All" },
  { Apply: 1 },
  { Screening: 2 },
  { "Interview HR": 3 },
  { "Interview HR II": 7 },
  { "Interview User": 4 },
  { "Interview User II": 8 },
  { "Interview C level": 9 },
  { "Interview C level II": 10 },
  { "Interview CEO": 11 },
  { Reject: 5 },
  { Hired: 6 },
];
