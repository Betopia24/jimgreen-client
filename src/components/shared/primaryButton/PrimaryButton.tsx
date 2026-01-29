/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { LuLoader } from "react-icons/lu";

// const PrimaryButton = ({
//   text,
//   onClick,
//   children,
//   loading = false,
//   type,
// }: {
//   text?: string;
//   loading?: boolean;
//   onClick?: any;
//   children?: React.ReactNode;
//   type?: "button" | "submit" | "reset";
// }) => {
//   return children ? (
//     <div
//       onClick={onClick}
//       className="px-2 cursor-pointer text-center py-2 bg-primary/80 transition-all duration-300 text-white hover:bg-primary shadow"
//     >
//       {children}
//     </div>
//   ) : (
//     <button
//       type={type}
//       disabled={loading}
//       onClick={onClick}
//       className="px-3 py-2 w-full text-center rounded-[8px] bg-primaryColor transition-all duration-300 text-white hover:bg-primaryColor shadow cursor-pointer"
//     >
//       <div className={`flex items-center justify-center gap-2`}>
//         <LuLoader
//           className={`${
//             loading ? "opacity-100" : "opacity-0"
//           } animate-spin text-center absolute`}
//         />
//         <span className={`${loading ? "opacity-0" : "opacity-100"}`}>
//           {text}
//         </span>
//       </div>
//     </button>
//   );
// };

// export default PrimaryButton;

import React from "react";
import { LuLoader } from "react-icons/lu";

interface PrimaryButtonProps {
  text?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string; // ✅ allow custom class
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  children,
  loading = false,
  type = "button",
  disabled = false,
  className = "", // default empty
}) => {
  // If children exist → render as div button
  if (children) {
    return (
      <div
        role="button"
        aria-disabled={loading || disabled}
        onClick={!loading && !disabled ? onClick : undefined}
        className={`px-2 py-2 text-center rounded-md
          bg-primary/80 text-white shadow cursor-pointer
          hover:bg-primary transition-all duration-300
          ${loading || disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${className}  // ✅ custom classes applied
        `}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`px-3 py-2 rounded-[8px]
        bg-primaryColor text-white shadow
        hover:bg-primaryColor transition-all duration-300
        flex items-center justify-center gap-2
        ${loading || disabled ? "opacity-70 cursor-not-allowed" : ""}
        ${className}  // ✅ custom classes applied
      `}
    >
      {loading && <LuLoader className="animate-spin" />}
      <span>{text}</span>
    </button>
  );
};

export default PrimaryButton;
