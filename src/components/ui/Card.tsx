import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const baseStyles = "rounded-xl transition-all duration-300";
    
    const variants = {
      default: "bg-card text-card-foreground border border-night-200 dark:border-night-700",
      elevated: "bg-card text-card-foreground shadow-lg shadow-night-200/50 dark:shadow-night-900/50",
      glass: "bg-white/60 backdrop-blur-md border border-white/20 dark:bg-night-800/60 dark:border-night-700/50",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
export type { CardProps };
