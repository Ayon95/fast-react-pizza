import React from "react";
import { twMerge } from "tailwind-merge";

export default function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full rounded-full border border-stone-200 bg-yellow-100 px-4 py-2 text-sm transition-all placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3",
        className,
      )}
    />
  );
}
