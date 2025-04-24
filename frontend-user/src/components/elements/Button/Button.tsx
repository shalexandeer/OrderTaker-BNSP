import classNames from "classnames";
import { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "danger";
}

const variants = {
  primary:
    "bg-[--ion-color-primary] hover:bg-primaryNormalHover text-[#ffffff] hover:bg-[--ion-color-primary-shade]",
  secondary:
    "bg-[#ffffff] hover:bg-infoLightHover border border-[--gray-300] text-infoDark",
  danger: "bg-red-500 border-red-500 text-white hover:brightness-90",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          "shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] h-[40px] rounded-lg font-semibold transition-all",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
