import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Loader2, User } from "lucide-react";
import { AvatarPreviewProps } from "@/types/avatar";

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  file,
  avatarUrl,
  onOpenFileDialog,
  isLoading = false,
}) => {
  // Determine which image source to use
  const imageSrc = file?.preview || avatarUrl || "";

  return (
    <div
      className="relative h-26 w-26 md:h-36 md:w-36 mx-auto cursor-pointer group"
      onClick={onOpenFileDialog}
      role="button"
      tabIndex={0}
      aria-label="Change avatar"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenFileDialog();
        }
      }}
    >
      <Avatar className="h-26 w-26 md:h-36 md:w-36 border-2 border-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30">
        <AvatarImage src={imageSrc} alt="User avatar" />
        <AvatarFallback className="bg-muted">
          {isLoading ? (
            <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
          ) : (
            <User className="h-10 w-10 text-muted-foreground" />
          )}
        </AvatarFallback>
      </Avatar>

      {/* Overlay that appears on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          isLoading && "opacity-70"
        )}
      >
        {isLoading ? (
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        ) : (
          <span className="text-xs font-medium text-white">Change Photo</span>
        )}
      </div>
    </div>
  );
};
