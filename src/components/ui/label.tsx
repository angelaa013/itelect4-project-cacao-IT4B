import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("block text-xs font-black uppercase tracking-widest text-[#3D0C02] mb-2", className)}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
