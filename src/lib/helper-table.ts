// Fungsi untuk memformat status badge
export const getStatusVariant = (status: string) => {
  switch (status?.toLowerCase()) {
    case "apply":
      return "bg-lime-600";
    case "screening":
      return "bg-lime-500";
    case "interview hr":
      return "bg-sky-400";
    case "interview hr ii":
      return "bg-sky-500";
    case "hr test":
      return "bg-sky-600";
    case "psychological test":
      return "bg-sky-600";
    case "interview user":
      return "bg-purple-400";
    case "interview user ii":
      return "bg-purple-500";
    case "technical test":
      return "bg-purple-600";
    case "interview c level":
      return "bg-orange-400";
    case "interview c level ii":
      return "bg-orange-500";
    case "interview ceo":
      return "bg-fuchsia-500";
    case "ignored by company":
      return "bg-red-500";
    case "reject":
      return "bg-red-500";
    case "reject cv":
      return "bg-red-500";
    case "reject interview hr":
      return "bg-red-500";
    case "reject hr test":
      return "bg-red-500";
    case "reject interview user":
      return "bg-red-500";
    case "reject technical test":
      return "bg-red-500";
    case "closed vacancy":
      return "bg-red-500";
    case "success":
      return "bg-emerald-500";
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
  { "Psycological test": 12 },
  { "HR test": 13 },
  { "Technical test": 14 },
  { "Ignored by company": 15 },
  { "Reject CV": 16 },
  { "Reject interview HR": 17 },
  { "Reject interview user": 18 },
  { "Reject HR test": 19 },
  { "Reject technical test": 20 },
  { "Closed vacancy": 21 },
  { Reject: 5 },
  { Hired: 6 },
];
