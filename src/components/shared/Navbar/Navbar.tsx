
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import * as React from "react"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Container from '@/lib/Container';
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
    const pathName = usePathname()

    return (
        <div className='pt-6 px-3 md:px-0'>
            <Container className="bg-[#FFFFFF66] border border-white rounded-2xl py-2 px-3 backdrop-blur-[2px] flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl">
                    <div>
                        <img src="/navbar/logo.svg" alt="logo" className='w-12 md:w-[97px] h-8 md:h-[50px]' />
                    </div>
                </Link>
                {/* Center Menu */}
                <div className="hidden lg:flex items-center md:gap-6 lg:gap-12 text-[#000000] text-[16px] font-medium">
                    <Link href="/" className={pathName === "/" ? "text-[#563FB1] font-semibold" : ""}>Home</Link>
                    <Link href="/pricing" className={pathName === "/pricing" ? "text-[#563FB1] font-semibold" : ""}>Pricing</Link>
                    <Link href="/faq" className={pathName === "/faq" ? "text-[#563FB1] font-semibold" : ""}>FAQ</Link>
                    <Link href="/dashboard/dashboard" className={pathName === "/dashboard/dashboard" ? "text-[#563FB1] font-semibold" : ""}>Dashboard</Link>
                </div>

                {/* Right Section for large device */}
                <div className="hidden md:flex items-center gap-2 lg:gap-3">

                    <Link href="/signIn" className="group">
                        <span className="px-4 lg:px-5 py-3 rounded-[6px] font-medium transition bg-[#F5F5F5] hover:bg-primaryColor hover:text-white text-[#2D2D2D]">
                            Login
                        </span>
                    </Link>

                    <Link href="/signUp" className="group">
                        <span className="px-4 lg:px-5 py-3 rounded-[6px] font-medium transition bg-primaryColor text-white">
                            Get Started
                        </span>
                    </Link>
                </div>

                {/* 🔽 Dropdown Menu Added for mobile device */}
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline">
                                <IoIosMenu />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 md:hidden">
                            <DropdownMenuItem className='px-2 py-0.5 hover:text-[#563FB1]'>
                                <Link
                                    href="/"
                                    className={`${pathName === "/" ? "text-[#563FB1] font-semibold" : ""}`}
                                >
                                    Home
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className='px-2 py-0.5 hover:text-[#563FB1]'>
                                <Link
                                    href="/pricing"
                                    className={`${pathName === "/pricing" ? "text-[#563FB1] font-semibold" : ""}`}
                                >
                                    Pricing
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className='px-2 py-0.5 hover:text-[#563FB1]'>
                                <Link
                                    href="/dashboard/home"
                                    className={`w-full ${pathName === "/dashboard" ? "text-[#563FB1] font-semibold" : ""}`}
                                >
                                    My Portal
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='px-2 py-0.5 hover:text-[#563FB1]'>
                                <Link
                                    href="/login"
                                    className={`w-full ${pathName === "/login" ? "text-[#563FB1] font-semibold" : ""}`}
                                >
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='px-2 py-0.5 hover:text-[#563FB1]'>
                                <Link
                                    href="/signUp"
                                    className={`w-full ${pathName === "/signUp" ? "text-[#563FB1] font-semibold" : ""}`}
                                >
                                    Get Started
                                </Link>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </Container>
        </div>
    );
};

export default Navbar;
