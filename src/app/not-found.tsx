"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text leading-none animate-pulse"
              style={{ backgroundImage: 'linear-gradient(to right, #004AAD, #7c3aed)' }}>
            404
          </h1>
          
          {/* Floating Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-blue-200 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-4 bg-purple-200 rounded-full opacity-20 animate-ping" style={{ animationDelay: "0.5s" }}></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, we'll help you find your way back!
          </p>

          {/* Countdown Timer */}
          <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg border-2 border-blue-100">
            <p className="text-gray-700">
              Redirecting to home in{" "}
              <span className="font-bold text-xl" style={{ color: '#004AAD' }}>{countdown}</span>{" "}
              seconds
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-[#004AAD] text-white rounded-lg font-medium hover:bg-[#003a8c] transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            Back to Home
          </Link> */}

          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg border-2 border-gray-200 cursor-pointer"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          {/* <Link
            href="/dashboard/dashboard"
            className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg border-2 border-gray-200"
          >
            <Search size={20} className="group-hover:scale-110 transition-transform" />
            Dashboard
          </Link> */}
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          Need help? Contact our support team at{" "}
          <a href="mailto:support@example.com" className="hover:underline font-medium" style={{ color: '#004AAD' }}>
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
}