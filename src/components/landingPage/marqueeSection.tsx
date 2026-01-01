import Marquee from "react-fast-marquee";

function MarqueeSection() {
    return (
        <div className="bg-white pb-6 pt-6 -mt-1">
            {/* <div className="w-full h-12 bg-white -mb-6"></div> */}
            <div className='border-t border-b border-gray-200 bg-white'>
                <div className="my-12">
                    <h3 className='md:text-xl sm:text-lg px-3 font-semibold text-[#2D2D2D] text-center mb-8'>Built by water treatment engineers, researchers,
                        and business operators for industry professionals just like you.</h3>
                    <Marquee speed={50} gradient={false} className="flex items-center space-x-8 px-4 sm:px-8 md:px-12">
                        <img src="/landingPage/marqueeSection/openZpp.png" alt="OpenZeppelin" className="px-12 h-11" />
                        <img src="/landingPage/marqueeSection/orac.png" alt="Oracle" className="px-12 h-8" />
                        <img src="/landingPage/marqueeSection/mor.png" alt="Morpheus" className="px-12 h-16" />
                        <img src="/landingPage/marqueeSection/samsun.png" alt="Samsung" className="px-12 h-8" />
                        <img src="/landingPage/marqueeSection/mond.png" alt="Monday" className="px-12 h-12" />
                        <img src="/landingPage/marqueeSection/segm.png" alt="Segment" className="px-12 h-12" />
                        <img src="/landingPage/marqueeSection/pro.png" alt="Protonet" className="px-12 h-12" />
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default MarqueeSection

