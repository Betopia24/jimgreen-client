"use client";

import React from "react";

interface GradientButtonProps {
children: React.ReactNode;
onClick?: () => void;
className?: string;
type?: "button" | "submit" | "reset";
}

const GradientButton: React.FC<GradientButtonProps> = ({
children,
onClick,
className = "",
type = "button",
}) => {
return (
<button
type={type}
onClick={onClick}
style={{
borderRadius: "6px",
padding: "13px 12px",
}}
className={`bg-[#6E51E0]
      flex items-center justify-center gap-1.5 text-white ${className}`}
>
{children} </button>
);
};

export default GradientButton;
