import Container from '@/lib/Container'
import Link from "next/link"
import { FaPlayCircle } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';

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
        </Container>
      </div>

      {/* background images behind content */}
      <div className='absolute inset-0 z-0'>
        <img
          src="/landingPage/NextMeeting/nextMeetingImageTop.svg"
          alt=""
          className='absolute top-0 left-0 right-0 w-full h-auto'
        />
        <img
          src="/landingPage/NextMeeting/nextMeetingImageBottom.svg"
          alt=""
          className='absolute bottom-0 left-0 right-0 w-full h-auto'
        />
      </div>
    </div>
  )
}

export default NextMeeting
