// "use client"
// import Container from '@/lib/Container'
// import { MdOutlineStar } from "react-icons/md";
// import Slider, { Settings } from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function TestimonialSection() {
//   const settings: Settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   return (
//     <Container className='my-20'>
//       {/* Header Section */}
//       < div className="text-center px-3 md:px-0 mb-12" >
//         <p className="text-[#6E51E0] font-semibold text-[16px] mb-3">
//           Testimonials
//         </p>
//         <h1 className="text-3xl md:text-4xl font-medium text-[#2D2D2D] mb-3">
//           Check what our clients are saying
//         </h1>
//       </div >
//       <div className='flex justify-between items-center gap-20'>
//         <div
//           className="w-[486px] h-[606px] mx-auto bg-center bg-no-repeat"
//           style={{
//             backgroundImage: "url('/landingPage/testimonialSection/testimonialLeftImage.png')",
//             backgroundSize: '90% 90%',
//             backgroundPosition: 'center center',
//           }}
//         >
//           <div className="slider-container w-full mt-20 mx-auto p-4"
//           >
//             <Slider {...settings}>
//               <div>
//                 <h3 className="p-10 bg-gray-200 h-[300px] rounded">dsffffffffffffffffffffff1</h3>
//               </div>
//               <div>
//                 <h3 className="p-10 bg-gray-200 rounded">2dsffffffffffffffffffff</h3>
//               </div>
//               <div>
//                 <h3 className="p-10 bg-gray-200 rounded">3dffffffffffffff</h3>
//               </div>
//               <div>
//                 <h3 className="p-10 bg-gray-200 rounded">4fdddddddddddddddddddddddddddddddddd</h3>
//               </div>
//               <div>
//                 <h3 className="p-10 bg-gray-200 rounded">5ddddddddddddddddddddddddddd</h3>
//               </div>
//               <div>
//                 <h3 className="p-10 bg-gray-200 rounded">6fffffffffffffffffffffffff</h3>
//               </div>
//             </Slider>
//           </div>
//         </div>

//         <div className='flex-1'>
//           <img src="/landingPage/testimonialSection/QuoteIcon.png" alt="" className='mb-5' />
//           <div className='flex items-center mb-5'>
//             <MdOutlineStar className='text-yellow-500 w-6 h-6' />
//             <MdOutlineStar className='text-yellow-500 w-6 h-6' />
//             <MdOutlineStar className='text-yellow-500 w-6 h-6' />
//             <MdOutlineStar className='text-yellow-500 w-6 h-6' />
//             <MdOutlineStar className='text-yellow-500 w-6 h-6' />
//             <MdOutlineStar className='text-yellow-500 w-6 h-6' />
//           </div>
//           <p className='text-2xl text-[#2D2D2D]'>Is be upon sang fond must shew. Really boy law county
//             she unable her sister. Feet you off its like like six. Among sex are leave law built now.</p>
//           <div className='flex justify-between items-center mt-10'>
//             <div>
//               <h4 className='text-xl font-bold text-[#2D2D2D]'>AR Shakir</h4>
//               <p className='text-[16px] text-[#636F85]'>CEO GetNextDesign</p>
//             </div>
//             <div>
//               <img src="landingPage/testimonialSection/segmaTextImage.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   )
// }

// export default TestimonialSection


"use client"
import Container from '@/lib/Container'
import { MdOutlineStar } from "react-icons/md";
import { useState, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

function TestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const testimonials = [
    {
      id: 1,
      quote: "Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.",
      name: "AR Shakir",
      position: "CEO GetNextDesign",
      rating: 5,
      humanImage: "landingPage/testimonialSection/human1.jpg",
      company: "landingPage/testimonialSection/segmaTextImage.png"
    },
    {
      id: 2,
      quote: "Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.",
      name: "John Smith",
      position: "Marketing Director",
      rating: 5,
      humanImage: "landingPage/testimonialSection/human2.png",
      company: "landingPage/testimonialSection/segmaTextImage.png"
    },
    {
      id: 3,
      quote: "Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.",
      name: "Sarah Johnson",
      position: "Founder & CEO",
      rating: 5,
      humanImage: "landingPage/testimonialSection/human1.jpg",
      company: "landingPage/testimonialSection/segmaTextImage.png"
    },
    {
      id: 4,
      quote: "Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.",
      name: "Michael Brown",
      position: "Product Manager",
      rating: 5,
      humanImage: "landingPage/testimonialSection/human2.png",
      company: "landingPage/testimonialSection/segmaTextImage.png"
    },
    {
      id: 5,
      quote: "Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.",
      name: "Emily Davis",
      position: "Operations Head",
      rating: 5,
      humanImage: "landingPage/testimonialSection/human1.jpg",
      company: "landingPage/testimonialSection/segmaTextImage.png"
    },
    {
      id: 6,
      quote: "Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.",
      name: "David Wilson",
      position: "Business Owner",
      rating: 5,
      humanImage: "landingPage/testimonialSection/human2.png",
      company: "landingPage/testimonialSection/segmaTextImage.png"
    }
  ];

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <Container className='my-20 px-3 md:px-0'>
      {/* Header Section */}
      <div className="text-center px-3 md:px-0 mb-16">
        <p className="text-[#6E51E0] font-semibold text-[16px] mb-3">
          Testimonials
        </p>
        <h1 className="text-3xl md:text-4xl font-medium text-[#2D2D2D] mb-3">
          Check what our clients are saying
        </h1>
      </div>

      <div className='flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20'>
        {/* Left Side - Background Image with Carousel */}
        <div className="w-full lg:w-[480px] relative">
          <div
            className="max-w-[480px] mx-auto h-[606px] bg-center bg-no-repeat relative"
            style={{
              backgroundImage: "url('/landingPage/testimonialSection/testimonialLeftImage.png')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'center center',
            }}
          >
            {/* Centered Carousel */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%]">
              <div className=''>
                <Slider ref={sliderRef} {...settings}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id}>
                      <div className="flex flex-col justify-center">
                        <div className='max-w-[390px] h-[479px]'>
                          <img
                            src={testimonial.humanImage}
                            alt="humanImage"
                            className='w-full h-full overflow-hidden object-cover'
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>


            {/* Green Arrow Navigation Buttons */}
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-t from-[#000000] to-[#6E51E0] hover:from-[#000000] z-10 rounded-full flex items-center justify-center"
            >
              <IoChevronBackOutline className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="absolute right-7 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-t from-[#000000] to-[#6E51E0] hover:from-[#000000] z-10 rounded-full flex items-center justify-center"
            >
              <IoChevronForwardOutline className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Right Side - Featured Testimonial */}
        <div className='flex-1 px-4 lg:px-0'>
          <img
            src="/landingPage/testimonialSection/QuoteIcon.png"
            alt="Quote Icon"
            className='mb-6 w-8 h-8'
          />
          <div className='flex items-center mb-6'>
            {[...Array(testimonials[currentSlide].rating)].map((_, index) => (
              <MdOutlineStar key={index} className='text-yellow-400 w-6 h-6' />
            ))}
          </div>
          <p className='text-xl lg:text-2xl text-[#2D2D2D] leading-relaxed mb-8'>
            {testimonials[currentSlide].quote}
          </p>
          <div className='flex justify-between items-center mt-10 pt-6 border-t border-gray-200'>
            <div>
              <h4 className='text-xl font-bold text-[#2D2D2D]'>{testimonials[currentSlide].name}</h4>
              <p className='text-[16px] text-[#636F85] mt-1'>{testimonials[currentSlide].position}</p>
            </div>
            <div>
              <img
                src={testimonials[currentSlide].company}
                alt="Company Logo"
                className='h-8 object-contain'
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default TestimonialSection