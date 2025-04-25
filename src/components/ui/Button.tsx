import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "ghost" | "solid";
  size?: "sm" | "icon";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, variant = "solid", size, className = "", ...props }: ButtonProps) {
  const base = "rounded px-3 py-2 font-medium";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent hover:bg-gray-100",
  };
  const sizes = {
    sm: "text-sm px-2 py-1",
    icon: "p-2",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${size ? sizes[size] : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
