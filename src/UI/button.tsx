import React, { forwardRef, ElementType, ButtonHTMLAttributes, CSSProperties } from "react";

// Variants similar to shadcn but without Tailwind

type Variant = "default" | "outline" | "ghost" | "destructive" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: ElementType;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.15s ease",
  fontWeight: 500,
  userSelect: "none",
};

const variantStyles: Record<Variant, CSSProperties> = {
  default: {
    backgroundColor: "#0f172a", // slate-900
    color: "white",
    border: "1px solid #0f172a",
  },
  outline: {
    backgroundColor: "white",
    color: "#0f172a",
    border: "1px solid #e2e8f0", // slate-200
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#0f172a",
    border: "1px solid transparent",
  },
  destructive: {
    backgroundColor: "#dc2626", // red-600
    color: "white",
    border: "1px solid #dc2626",
  },
  link: {
    backgroundColor: "transparent",
    color: "#0f172a",
    border: "none",
    paddingLeft: 0,
    paddingRight: 0,
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
};

const sizeStyles: Record<Size, CSSProperties> = {
  sm: {
    height: "32px",
    padding: "0 12px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  md: {
    height: "40px",
    padding: "0 16px",
    fontSize: "15px",
    borderRadius: "8px",
  },
  lg: {
    height: "48px",
    padding: "0 20px",
    fontSize: "16px",
    borderRadius: "10px",
  },
};

const spinnerStyle: CSSProperties = {
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255,255,255,0.4)",
  borderTopColor: "white",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      as: Component = "button",
      loading = false,
      icon,
      disabled,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);

    const hoverStyles: Partial<CSSProperties> = hovered
      ? {
          filter: "brightness(0.92)",
          transform: "translateY(-1px)",
        }
      : {};

    const finalStyle: CSSProperties = {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
      opacity: disabled || loading ? 0.6 : 1,
      cursor: disabled || loading ? "not-allowed" : "pointer",
      ...hoverStyles,
      ...style,
    };

    const content = (
      <>
        {loading ? (
          <span style={spinnerStyle} />
        ) : (
          icon && <span>{icon}</span>
        )}
        <span>{children}</span>
      </>
    );

    return React.createElement(
      Component,
      {
        ref,
        style: finalStyle,
        className,
        onMouseEnter: () => !disabled && !loading && setHovered(true),
        onMouseLeave: () => setHovered(false),
        disabled: Component === "button" ? disabled || loading : undefined,
        "aria-disabled": disabled || loading ? true : undefined,
        ...props,
      },
      content
    )
  }
);

Button.displayName = "Button";

export default Button;
