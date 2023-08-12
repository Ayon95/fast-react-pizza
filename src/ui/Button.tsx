import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type BaseProps = {
  children: React.ReactNode;
  size?: "xsmall" | "small" | "large";
  color?: "primary" | "secondary";
};

type ButtonAsButtonProps = BaseProps &
  React.ComponentPropsWithoutRef<"button"> & {
    as?: "button";
  };

type ButtonAsLinkProps = BaseProps &
  LinkProps & {
    as: "link";
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

type Attributes = Required<Omit<BaseProps, "children">>;

type VariantStyles = {
  [Attribute in keyof Attributes]: {
    [Variant in Attributes[Attribute]]: string;
  };
};

export default function Button({
  children,
  className,
  size,
  color,
  ...props
}: ButtonProps) {
  const variantStyles: VariantStyles = {
    size: {
      xsmall: "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
      small: "px-4 py-2 md:px-5 md:py-2.5 text-xs",
      large: "px-4 py-3 md:px-6 md:py-4",
    },
    color: {
      primary:
        "bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-300 disabled:bg-yellow-200",
      secondary:
        "border-2 border-stone-300 text-stone-500 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:ring-stone-300 disabled:bg-stone-200",
    },
  };

  const allClasses = twMerge(
    "inline-block rounded-full text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:text-stone-500",
    size ? variantStyles["size"][size] : variantStyles["size"]["large"],
    color ? variantStyles["color"][color] : variantStyles["color"]["primary"],
    className,
  );

  if (props.as === "link") {
    return (
      <Link className={allClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
}
