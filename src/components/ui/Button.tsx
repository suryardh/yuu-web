import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500 dark:bg-sky-400 dark:hover:bg-sky-500 dark:text-night-900 dark:focus:ring-sky-400",
      secondary: "bg-night-100 hover:bg-night-200 text-night-700 focus:ring-night-400 dark:bg-night-700 dark:hover:bg-night-600 dark:text-night-100 dark:focus:ring-night-500",
      ghost: "bg-transparent hover:bg-night-100 text-night-600 focus:ring-night-400 dark:hover:bg-night-800 dark:text-night-300 dark:focus:ring-night-500",
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
