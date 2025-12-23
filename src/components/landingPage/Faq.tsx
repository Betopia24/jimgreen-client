"use client"
import Container from "@/lib/Container"
import { useState } from "react";
import { GoArrowDown, GoArrowRight  } from "react-icons/go";


function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How can I contact Inkyy Team?",
      answer: "You can reach us through our contact form on our website or by emailing us at xyz@gmail.com. We typically respond within 24 hours."
    },
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of digital services including web design, web development, mobile app development, UI/UX design, branding, and digital marketing solutions."
    },
    {
      question: "Do you provide website maintenance services?",
      answer: "Yes, we provide comprehensive website maintenance services including regular updates, security monitoring, backup management, performance optimization, and technical support to ensure your website runs smoothly."
    },
    {
      question: "How long does it take to design and develop a website?",
      answer: "The timeline varies depending on the project complexity and requirements. A basic website typically takes 2-4 weeks, while more complex websites with custom features can take 8-12 weeks or more. We'll provide a detailed timeline after understanding your specific needs."
    },
    {
      question: "Do you require a deposit for projects?",
      answer: "Yes, we typically require a 50% deposit to begin work on your project. The remaining balance is due upon project completion and your approval. This helps us commit resources to your project and ensures mutual commitment."
    }
  ];
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return (
    <Container className="my-20">
      {/* Header Section */}
      < div className="text-center mx-3 md:px-0 mb-12" >
        <p className="text-[#6E51E0] font-semibold text-[16px] mb-3">
          FAQ
        </p>
        <h1 className="text-3xl md:text-4xl font-medium text-[#2D2D2D] mb-3">
          Frequently Asked
        </h1>
        <button className='text-4xl md:text-5xl text-[#6E51E0] font-medium bg-[#FCF1FE] px-[10px] py-[14px] rounded-sm mb-8'>Questions</button>
        <p className="text-[18px] text-[#636F85]">Your success is our top priority. Our dedicated support team <br />
          is here to assist you every step of  the way</p>
      </div >
      <div className="lg:flex justify-center items-center">
        <div className="max-w-[486px] h-[360px] mx-auto mb-3 lg:mb-0">
          <img src="/landingPage/faq/laptopImage.png" alt="" className="w-full h-full px-3 lg:px-0" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center px-3 lg:px-12 py-3">
            <div className="w-full">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-[#EBECEF] rounded-[10px] my-2">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-3 flex items-start justify-between text-left hover:bg-gray-50 transition-colors text-[#2D2D2D] text-xl font-bold"
                    style={
                      openIndex === index
                        ? { backgroundColor: "#FFFFFF", borderRadius: "10px" }
                        : {
                          boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)"
                        }
                    }

                  >
                    <div className="flex-1 pr-4">
                      <h3 className="text-base font-semibold text-gray-900 leading-relaxed">
                        {faq.question}
                      </h3>
                      {openIndex === index && (
                        <p className="mt-3 text-sm text-[#636F85] leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {openIndex === index ? (
                        <GoArrowDown className="w-4 h-4 text-gray-700" />
                      ) : (
                        <GoArrowRight className="w-4 h-4 text-gray-700" />
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Faq