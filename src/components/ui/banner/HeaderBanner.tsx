"use client";

import Container from "@/lib/Container";
import React from "react";

interface HeaderBannerProps {
  title?: string;
  subTitle?: string;
  // breadcrumb?: string;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({
  title = "About Us",
  subTitle = "",
  // breadcrumb = "Home / About Us",
}) => {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] w-full mt-4 md:mt-10 z-10 px-3 sm:px-6 lg:px-0">
      <Container className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-10 md:py-12">

        {/* Left content */}
        <div className="w-full sm:w-auto text-center sm:text-left">
          <h2 className="text-[#2D2D2D] font-rubik 
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-medium leading-tight">
            {title}
          </h2>

          <p className="mt-2 max-w-full sm:max-w-md md:max-w-lg 
        text-sm sm:text-base text-[#636F85]">
            {subTitle}
          </p>
        </div>

        {/* Breadcrumb */}
        <p className="bg-gradient-to-b from-[#6E51E0] to-black bg-clip-text text-transparent 
      font-rubik text-sm sm:text-base md:text-lg 
      text-center sm:text-right">
          {/* {breadcrumb} */}
        </p>

      </Container>
    </div>

  );
};

export default HeaderBanner;
