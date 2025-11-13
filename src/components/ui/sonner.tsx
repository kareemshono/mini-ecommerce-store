// components/ui/Toaster.tsx
"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "#0f172a", // slate-950
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",

          // Force text color for ALL toast types
          "--success-text": "#0f172a",
          "--info-text": "#0f172a",
          "--warning-text": "#0f172a",
          "--error-text": "#0f172a",
          "--loading-text": "#0f172a",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          color: "#0f172a", // Fallback
        },
      }}
      {...props}
    />
  );
};

export { Toaster };