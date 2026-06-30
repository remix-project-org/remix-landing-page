import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "tertiary" | "ai" | "success";
type Size = "lg" | "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  iconLeft?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-pressed text-white",
  secondary:
    "bg-btn-secondary hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed text-text-primary border border-border-light",
  tertiary:
    "bg-transparent hover:bg-layer-1 text-text-secondary hover:text-text-primary",
  ai: "bg-gradient-to-r from-remix-ai/20 to-primary/20 hover:from-remix-ai/30 hover:to-primary/30 text-remix-ai border border-remix-ai/40",
  success:
    "bg-btn-success hover:bg-btn-success-hover active:bg-btn-success-pressed text-white",
};

const sizeClasses: Record<Size, string> = {
  lg: "h-11 px-6 text-[14px] font-bold leading-none rounded-lg gap-2",
  md: "h-9 px-4 text-[12px] font-bold leading-none rounded-md gap-1.5",
  sm: "h-7 px-3 text-[11px] font-bold leading-none rounded gap-1",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "lg",
      href,
      external,
      iconLeft,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-sans transition-colors duration-150 cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed";
    const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (href) {
      return (
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
          onClick={props.onClick ? (e) => props.onClick!(e as unknown as React.MouseEvent<HTMLButtonElement>) : undefined}
        >
          {iconLeft && <span className="shrink-0">{iconLeft}</span>}
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled} className={classes} {...props}>
        {iconLeft && <span className="shrink-0">{iconLeft}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
