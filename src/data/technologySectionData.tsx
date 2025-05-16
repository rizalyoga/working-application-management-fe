import {
  Server,
  Database,
  Code,
  Shield,
  Layers,
  Paintbrush,
  Component,
  RefreshCw,
  Package,
  FileCheck,
  FileWarning,
} from "lucide-react";

export const backendTech = [
  {
    name: "Express",
    description: "Framework node.js that is fast and minimalist to build fire",
    icon: <Server size={20} />,
  },
  {
    name: "Supabase",
    description:
      "The Backend Open Source platform that provides databases, author, and storage",
    icon: <Database size={20} />,
  },
  {
    name: "TypeScript",
    description: "Programming language that adds static typing to javascript",
    icon: <Code size={20} />,
  },
  {
    name: "JWT",
    description:
      "Standards for safe tokens used for authentication and authorization",
    icon: <Shield size={20} />,
  },
];

export const frontendTech = [
  {
    name: "React",
    description: "Javascript library to build an interactive user interface",
    icon: <Layers size={20} />,
  },
  {
    name: "Tailwind CSS",
    description: "CSS Utility-First framework for fast and consistent design",
    icon: <Paintbrush size={20} />,
  },
  {
    name: "Shadcn UI",
    description: "UI components that are elegant and can be adjusted for react",
    icon: <Component size={20} />,
  },
  {
    name: "Tanstack Query",
    description: "Library to take, store cache, and update asynchronous data",
    icon: <RefreshCw size={20} />,
  },
  {
    name: "Zustand",
    description: "State Management Library that is light and simple for react",
    icon: <Package size={20} />,
  },
  {
    name: "React Hook Form",
    description: "Library for Form Management with High Performance",
    icon: <FileCheck size={20} />,
  },
  {
    name: "Zod",
    description:
      "Library Validation of Schema Typescript with Support Type Inference",
    icon: <FileWarning size={20} />,
  },
];
