import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border-2 border-[#3D0C02]/20 bg-[#FFFDF3] px-4 py-2 text-[#3D0C02] placeholder:text-[#3D0C02]/50 focus-visible:outline-none focus-visible:border-[#FAAB18] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
