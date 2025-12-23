import Container from '@/lib/Container'
import React from 'react'

function ThreeStep() {
    return (
        <Container>
            {/* Header Section */}
            <div className="text-center mt-20 mb-3">
                <p className="text-[#6E51E0] font-semibold text-[16px] mb-3">
                    How It Works
                </p>
                <h1 className="text-3xl md:text-4xl font-medium text-[#2D2D2D] mb-3">
                    Three Simple Steps to Meeting <br /> Success
                </h1>
                <p className="text-[#636F85] text-[16px]">
                    Go from zero to fully prepared in minutes with our AI-powered platform
                </p>
            </div>
            <div
                className="mt-8 mb-20 w-full lg:h-[600px] relative
                             bg-none
                             lg:bg-[url('/landingPage/threeStepSection/threeStepBackgroundImage.png')]
                             lg:bg-cover
                             lg:bg-no-repeat
                             lg:bg-[position:100%_100%]
                           "
            >
                <div className='flex flex-wrap justify-center items-center gap-12'>
                    <div className='lg:absolute lg:top-32 lg:left-[910px] text-center lg:text-left'>
                        <h3 className="text-[16px] font-bold text-[#000000]">
                            Start Your Meeting Confidently
                        </h3>
                        <p className="text-[16px] text-[#636F85]">
                            Use personalized recommendations <br /> tailored
                            to your goal.
                        </p>
                    </div>
                    <div className='lg:absolute lg:top-95 lg:left-[560px] text-center lg:text-left'>
                        <h3 className="text-[16px] font-bold text-[#000000]">
                            Get Instant Smart Insights
                        </h3>
                        <p className="text-[16px] text-[#636F85]">
                            Receive strengths, risks, <br /> opportunities, and
                            talking points.
                        </p>
                    </div>
                    <div className='lg:absolute lg:top-131 lg:left-[95px] text-center lg:text-left'>
                        <h3 className="text-[16px] font-bold text-[#000000]">
                            Paste the Company Name or URL
                        </h3>
                        <p className="text-[16px] text-[#636F85]">
                            Our AI scans public data, profiles, and <br /> recent news.
                        </p>
                    </div>
                </div>

            </div>

        </Container>
    )
}

export default ThreeStep