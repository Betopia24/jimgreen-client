// "use client";

// import Image, { StaticImageData } from "next/image";
// import React from "react";
// import GradientButton from "@/components/ui/GradientButton";
// import Container from "@/lib/Container";

// interface AboutSectionProps {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: StaticImageData;
//   buttonText?: string;
//   reverse?: boolean;
//   showButton?: boolean;
// }

// const AboutSection: React.FC<AboutSectionProps> = ({
//   title,
//   subtitle,
//   description,
//   image,
//   buttonText = "GET STARTED",
//   reverse = false,
//   showButton = false || true,
// }) => {
//   return (
//     <div className=" w-full py-4 md:py-8 xl:py-12 z-10 px-3 lg:px-0">
//       <Container
//         className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"
//           } items-center gap-8 xl:gap-32`}
//       >
//         <div className="w-full md:w-1/2">
//           <Image
//             src={image}
//             alt={title}
//             width={600}
//             height={400}
//             className="w-full h-auto object-cover"
//           />
//         </div>

//         <div className="w-full md:w-1/2 text-center xl:text-left">
//           <h6 className="text-[var(--Brand-Color-Primary,#6E51E0)] font-rubik text-sm sm:text-[16px] font-semibold leading-normal md:text-left text-center mb-2 sm:mb-3">
//             {subtitle}
//           </h6>
//           <h5 className="text-[var(--Font-Colors-Tittle,#2D2D2D)] font-rubik text-2xl sm:text-[40px] font-medium leading-snug md:text-left text-center sm:leading-normal mb-2">
//             {title}
//           </h5>
//           <p className="text-[var(--Font-Colors-Body,#636F85)] font-rubik text-sm sm:text-[16px] font-normal leading-6 md:text-left text-center sm:leading-[30px] mb-6">
//             {description}
//           </p>
//           {
//             showButton && (
//               <GradientButton className="mx-auto xl:mx-0">
//                 Get Started
//               </GradientButton>
//             )
//           }
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default AboutSection;



"use client";

import Image from "next/image";
import Container from "@/lib/Container";
import relationship from "@/assets/about_us/relationship.svg";
import idea from "@/assets/about_us/idea.svg";
import vision from "@/assets/about_us/vision.svg";
import { Heart, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="w-full py-10 sm:py-16 xl:py-24 px-3 lg:px-0">
      <Container className="space-y-6 xl:space-y-12">

        {/* ================= WHY WE BUILT ================= */}
        <section className="group flex flex-col md:flex-row items-center gap-10 lg:gap-16 xl:gap-28">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
            <Image
              src={relationship}
              alt="Why we built Phora"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h6 className="text-[#6E51E0] font-rubik text-sm sm:text-base font-semibold mb-3">
              Why We Built Phora
            </h6>

            <h2 className="text-[#2D2D2D] text-sm sm:text-base lg:text-lg leading-7 mb-4">
              Most sales tools focus on during or after the call.
              But world-class sellers know:
              <span className="text-[16]">the real difference is made before the meeting even begins</span> - when you understand the buyer, the company, the context, the challenges, and the right questions to ask.
            </h2>

            <div className="space-y-3 text-[#2D2D2D] text-sm sm:text-base flex flex-col">
              <p className="text-[16px]">Phora was built to solve three major gaps:</p>
              <span className="font-bold text-[#2D2D2D] text-sm sm:text-base lg:text-lg">1. Too much time spent researching accounts manually</span>
              <span className="font-bold text-[#2D2D2D] text-sm sm:text-base lg:text-lg">2. Generic role-plays that don’t reflect real buyer conversations</span>
              <span className="font-bold text-[#2D2D2D] text-sm sm:text-base lg:text-lg">3. Feedback that comes too late to make a difference</span>
            </div>
            <p className="text-[#2D2D2D] text-sm sm:text-base lg:text-lg leading-7 mt-3">We built a new category: the <span className="font-bold">Pre-Call Intelligence Layer</span> between your CRM and your first discovery call.</p>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="group flex flex-col md:flex-row-reverse items-center gap-10 lg:gap-16 xl:gap-28">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
            <Image
              src={idea}
              alt="Our mission"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h6 className="text-[#6E51E0] font-rubik text-sm sm:text-base font-semibold mb-3">
              Our Mission
            </h6>

            <p className="text-[#2D2D2D] text-sm sm:text-base lg:text-lg leading-7 mb-4">
              To help every sales professional walk into every meeting <span className="font-bold text-[16]">confident, informed, and ready to win</span> -
              by combining AI research, realistic simulations, and instant coaching in one seamless platform.
            </p>

            <p className="text-[#2D2D2D] text-sm sm:text-base leading-7">
              We exist to make <span className="font-bold text-[16]">preparation</span> a competitive advantage, not a burden.
            </p>
          </div>
        </section>

        {/* ================= VISION ================= */}
        <section className="group flex flex-col md:flex-row items-center gap-10 lg:gap-16 xl:gap-28">
          <div className="w-full md:w-1/2 rounded-2xl">
            <Image
              src={vision}
              alt="Our vision"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h6 className="text-[#6E51E0] font-rubik text-sm sm:text-base font-semibold mb-3">
              Our Vision
            </h6>

            <p className="text-[#2D2D2D] text-sm sm:text-base lg:text-lg leading-7 mb-4">
              To become the go-to <span className="font-bold text-[16]">Sales Copilot</span> that elevates every sales professional to top-performer level - not by replacing the human, but by empowering them with intelligence, clarity, and confidence before every call.

            </p>

            <div className="space-y-3 text-[#2D2D2D] text-sm sm:text-base flex flex-col">
              <p className="text-[16px]">We imagine a world where:</p>
              <span>. reps never walk into meetings unprepared</span>
              <span>. every discovery call is structured and high-value</span>
              <span>. companies build consistent, repeatable sales excellence</span>
              <span>. AI helps humans communicate better - not less</span>
            </div>
            <p className="mt-3">Phora is built to make that vision real.</p>
          </div>
        </section>

        {/* ================= WHAT WE DO ================= */}
        <section className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What We Do
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            Phora equips sellers with:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Instant account & stakeholder research",
              "Realistic AI meeting simulations",
              "Smart question recommendations based on methodology",
              "Real-time qualification (MEDDIC, BANT, SPIN, etc.)",
              "Actionable coaching & CRM-ready summaries",
              "Centralized account + opportunity intelligence",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[16px] text-[#636F85]">Our platform is used by B2B teams who want to shorten ramp time, increase qualification accuracy, and standardize elite sales practices at scale.</p>
        </section>

        {/* ================= WHO WE SERVE ================= */}
        <section className="rounded-2xl p-8 lg:p-16 text-center">
          <Users className="mx-auto mb-4 h-8 w-8 text-[#6E51E0]" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Who We Serve
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            We help:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {[
              "Account Executives",
              "SDR / BDR Teams",
              "Sales leaders & enablement teams",
              "Revenue operations",
              "Founders leading sales cycles",
            ].map((role, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card py-4 font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {role}
              </div>
            ))}
          </div>

          <p className="mt-6 text-[16px] text-[#636F85]">
            Our customers operate in SaaS, tech, professional services, cybersecurity, marketing, AI, and many more industries.
          </p>
          <p className="mt-3 text-[16px] text-[#636F85]">
            Phora currently supports <span className="font-bold text-[#2D2D2D]">English, French, Spanish, and Italian,</span> with more languages coming soon.
          </p>
        </section>

        {/* ================= WHY IT MATTERS ================= */}
        <section className="text-center max-w-3xl mx-auto">
          <Heart className="mx-auto mb-6 h-10 w-10 text-[#6E51E0]" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Why It Matters
          </h2>

          <p className="text-[16px] text-[#636F85] mb-6">
            Because great conversations build trust.
            Great preparation builds confidence.
            And great salespeople are made - not born.
          </p>

          <p className="text-xl font-semibold">
            We’re here to support them every step of the way.
          </p>
        </section>

      </Container>
    </section>
  );
}




