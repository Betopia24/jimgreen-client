import Container from '@/lib/Container'
import Link from 'next/link';
import { GoPlay } from 'react-icons/go';

function MeetingSuccess() {
    return (
        <Container className=' mb-16'>
            {/* Header Section */}
            <div className="text-center mt-20 mb-3">
                <p className="text-primaryColor font-semibold text-[16px] mb-3">
                    How It Works
                </p>
                <h1 className="text-2xl md:text-4xl font-medium text-headingColor mb-3">
                    Turn raw chemistry data into clear insights <br /> in minutes.
                </h1>
                <p className="text-paragraphColor text-sm sm:text-[16px] mb-6">
                    Go from zero to fully prepared in minutes with our AI-powered platform
                </p>
            </div>
            <div className="flex items-center justify-center px-6 pt-6">
                {/* Steps Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div
                        className="bg-white rounded-2xl p-8 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step Number */}
                        <div className="inline-block bg-[#E6EDF7] rounded-full px-3 py-2 mb-6">
                            <span className="text-xl text-primaryBgColor font-semibold">
                                01
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Input Your Water Data
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">Take a picture, Upload or type in water analysis results. AquaAdvisor converts the report to usable data automatically
                            using OCR and AI.  AI can even suggest values for missing or incomplete data. </p>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-8 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step Number */}
                        <div className="inline-block bg-[#FFEEEE] rounded-full px-2.5 py-2 mb-6">
                            <span className="text-xl text-primaryBgColor font-semibold">
                                02
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            AI Performs Calculations
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            Using established and tested Competing Ion Theory, AI calculates the saturation of over 100 different salts, operational details, and thousands of data points in seconds.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-8 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step Number */}
                        <div className="inline-block bg-[#FFF7E8] rounded-full px-2.5 py-2 mb-6">
                            <span className="text-xl text-primaryBgColor font-semibold">
                                03
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Explore Interactive Charts
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            ... And Use AI to answer all your "what if" scenarios
                        </p>
                    </div>
                </div>
            </div>
            {/* See How It Works Button */}
            <div className='flex justify-center items-center' >
                <Link href="" className="group">
                    <div
                        className="bg-white px-6 py-3 font-medium transition flex items-center gap-2 hover:bg-primaryColor border-2
                                        border-primaryColor rounded-lg hover:text-white text-primaryColor text-[16px]"
                    >
                        <span>
                            See How It Works
                        </span>
                        <GoPlay className="w-7 h-7 text-primaryColor group-hover:text-white transition" />
                    </div>
                </Link>
            </div>

        </Container>
    )
}

export default MeetingSuccess