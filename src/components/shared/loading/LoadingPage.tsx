"use client";

import Image from "next/image";
import loadingCircle from "@/assets/loading/loadingCerle.svg";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-64 lg:min-h-9/12">
      <div className="relative">
        <Image
          src={loadingCircle}
          width={100}
          height={100}
          alt="Loading"
          priority
          //   className="animate-spin"
        />
        <p className="mt-4 text-center text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
