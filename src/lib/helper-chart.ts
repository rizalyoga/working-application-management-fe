export const chartDistributionStatusConfig = {
  apply: { label: "Apply", color: "#8B5CF6" },
  screening: { label: "Screening", color: "#D946EF" },
  interview_hr: { label: "Interview HR", color: "#0EA5E9" },
  interview_hr_ii: { label: "Interview HR II", color: "#06B6D4" },
  hr_test: { label: "HR Test", color: "#14B8A6" },
  psychological_test: { label: "Psychological Test", color: "#10B981" },
  interview_user: { label: "Interview User", color: "#F97316" },
  interview_user_ii: { label: "Interview User II", color: "#F59E0B" },
  technical_test: { label: "Technical Test", color: "#EAB308" },
  interview_C_level: { label: "Interview C-Level", color: "#84CC16" },
  interview_C_level_ii: { label: "Interview C-Level II", color: "#22C55E" },
  interview_CEO: { label: "Interview CEO", color: "#3B82F6" },
  ignored_by_company: { label: "Ignored by Company", color: "#6B7280" },
  reject_cv: { label: "Rejected (CV)", color: "#EF4444" },
  reject_interview_hr: { label: "Rejected (Interview HR)", color: "#DC2626" },
  reject_interview_user: {
    label: "Rejected (Interview User)",
    color: "#B91C1C",
  },
  reject_hr_test: { label: "Rejected (HR Test)", color: "#991B1B" },
  reject_technical_test: {
    label: "Rejected (Technical Test)",
    color: "#7F1D1D",
  },
  reject: { label: "Rejected (General)", color: "#881337" },
  success: { label: "Success", color: "#15803D" },
  closed_vacancy: { label: "Closed Vacancy", color: "#4B5563" },
};

// Format label by replacing underscores with spaces and capitalizing words
export const formatLabel = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Define colors for different categories
export const colorMap: Record<string, string> = {
  apply: "#5EA500",
  screening: "#A0DC47",
  interview_hr: "#00BCFF",
  interview_hr_ii: "#00A6F4",
  hr_test: "#0084D1",
  psychological_test: "#0084D1",
  technical_test: "#9810FA",
  interview_user: "#C27AFF",
  interview_user_ii: "#AD46FF",
  interview_C_level: "#FF8904",
  interview_C_level_ii: "#FF6900",
  interview_CEO: "#E12AFB",
  ignored_by_company: "#6B7280", // gray
  reject_cv: "#EF4444", // red
  reject_interview_hr: "#DC2626", // red
  reject_interview_user: "#B91C1C", // dark red
  reject_hr_test: "#991B1B", // darker red
  reject_technical_test: "#7F1D1D", // darkest red
  reject: "#881337", // rose
  success: "#00BC7D",
  closed_vacancy: "#4B5563", // gray
};
