
import React from "react";
import AboutSection from "@/components/about-us/AboutSection";
import HeaderBanner from "@/components/ui/banner/HeaderBanner";
import StatsSection from "@/components/about-us/StatsSection";
import TestimonialSection from "@/components/landingPage/TestimonialSection";
import NextMeeting from "@/components/landingPage/nextMeeting";
// import MarqueeSection from "@/components/landingPage/marqueeSection";

function About() {
  return (
    <div className="relative">
      <section>
        <HeaderBanner title="About Our Company" subTitle="At Phora we believe the best sales conversations don’t start in the meeting -
 they start with better preparation." />

        {/* Problem Statement */}
        <section className="border-b border-border mb-3 px-3">
          <div className="text-center max-w-5xl mx-auto pt-6 md:pt-8 pb-3">
            <p className="text-[#2D2D2D] text-[16px]">
              Sales teams today are overwhelmed with information, meetings, tools, and expectations.
              Yet one of the most critical moments in any sales cycle - the first conversation - is often approached with limited context, rushed research, and guesswork.
            </p>
            <p className="mt-3 text-[#2D2D2D] text-2xl font-semibold">We’re here to change that.</p>
          </div>
        </section>

        {/* <AboutSection
          title="Management"
          subtitle="About"
          description="Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web."
          image={ralationship}
          showButton={true}
        />

        <AboutSection
          title="Mission and Vision"
          subtitle="Our Company"
          description="It is popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like"
          image={idea}
          reverse={true}
          showButton={false}
        /> */}

        <AboutSection />

        <StatsSection />
        <TestimonialSection />
        <NextMeeting />
          {/* <MarqueeSection /> */}
      </section>
    </div>
  );
}

export default About;