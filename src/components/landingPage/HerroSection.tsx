import Container from "@/lib/Container"
import Link from "next/link"
import { GoArrowRight } from "react-icons/go";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

function HerroSection() {
    return (
        <Container className="relative mb-12">
            <div className="z-50">
                {/* Hero Section */}
                <main className="px-6">
                    <div className="mt-16">
                        {/* Main Heading */}
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center text-[#191919] mb-5 leading-tight">
                            Advanced Chemistry <br /> Analysis and AI Field Companion
                        </h1>

                        {/* Subheading */}
                        <p className="text-center text-[#666666] text-[16px] mb-7 max-w-2xl mx-auto">
                            Generate Precise Reports, Visualize Water Chemistry and deliver Critical Insights to your customer with industry-grade accuracy powered by AI.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                            <Link href="" className="group">
                                <div
                                    className="bg-white px-6 py-3 font-medium transition flex items-center gap-2 hover:bg-primaryColor border-2
                                     border-primaryColor rounded-full hover:text-white text-primaryColor text-[16px]"
                                >
                                    <span>
                                        Start Free Trial
                                    </span>
                                    <div className="w-7 h-7 bg-primaryColor group-hover:bg-white flex justify-center items-center rounded-full transition">
                                        <IoIosSend className="w-5 h-5 text-white group-hover:text-primaryColor transition" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="" className="group">
                                <div
                                    className="bg-white px-6 py-3 font-medium transition flex items-center gap-2 hover:bg-primaryColor border-2
                                        border-primaryColor rounded-full hover:text-white text-primaryColor text-[16px]"
                                >
                                    <span>
                                        Explore Demo
                                    </span>
                                    <FaPlayCircle className="w-7 h-7 text-primaryColor group-hover:text-white transition" />
                                </div>
                            </Link>

                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}

export default HerroSection