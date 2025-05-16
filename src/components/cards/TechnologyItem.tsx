import React from "react";
import { Card, CardContent } from "../ui/card";
import clsx from "clsx";

interface TechItemProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const TechItem = ({ name, description, icon, className }: TechItemProps) => {
  return (
    <Card
      className={clsx(
        "border border-border/50 bg-background/50 dark:bg-black backdrop-blur-sm",
        className
      )}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-base my-3">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TechItem;
