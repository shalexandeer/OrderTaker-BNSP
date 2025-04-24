import classNames from "classnames";
import { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "active" | "unActive";
}

const variants = {
  active: "bg-[#FFF7F2] text-[#3dc2ff] text-[--ion-color-primary] ",
  unActive: "bg-[--ion-item-bg]  border border-[#E9EBEE] text-[#C1C1C1] ",
};

export const PillButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant = "unActive", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          "shadow-[0px 1px 2px  0px rgba(16, 24, 40, 0.05)] h-[40px] rounded-full p-[8px_12px] text-sm font-medium transition-all",
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

PillButton.displayName = "Button";
