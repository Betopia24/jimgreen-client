import Container from '@/lib/Container'
import Link from "next/link"
import { GoArrowRight } from "react-icons/go";

function NextMeeting() {
  return (
    <div className='bg-[#F7F8FA] relative'>
      {/* content on top of background images */}
      <div className="relative z-20">
        <Container>
          <div className='text-center py-[60px] md:py-[126px]'>
            <h3 className='text-4xl font-semibold text-[#2D2D2D]'>
              Walk Into Your Next Meeting <br /> Fully Prepared.
            </h3>

            {/* buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10 mb-12">
              <Link href="">
                <div
                  className="bg-white px-6 py-3 font-medium transition flex items-center gap-2 hover:bg-primaryBgColor border-2
                                         border-[#6E51E0] rounded-sm hover:text-white text-primaryBgColor text-[16px]"
                >
                  <span className="">
                    Prepare My Meeting
                  </span>
                  <GoArrowRight className="w-5 h-5" />
                </div>
              </Link>

              <Link href="" className="">
                <div
                  className="bg-white px-6 py-3 font-medium transition flex items-center gap-2 hover:bg-primaryBgColor border-2
                                         border-[#6E51E0] rounded-sm hover:text-white text-primaryBgColor text-[16px]"
                >
                  <span className="">
                    Try it Free
                  </span>
                  <GoArrowRight className="w-5 h-5" />
                </div>
              </Link>

            </div>
          </div>
        </Container>
      </div>

      {/* background images behind content */}
      <div className='absolute inset-0 z-0'>
        <img
          src="/landingPage/NextMeeting/nextMeetingImageTop.png"
          alt=""
          className='absolute top-0 left-0 right-0 w-full h-auto'
        />
        <img
          src="/landingPage/NextMeeting/nextMeetingImageBottom.png"
          alt=""
          className='absolute bottom-0 left-0 right-0 w-full h-auto'
        />
      </div>
    </div>
  )
}

export default NextMeeting
