import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* // right side blur divs */}
{/* Left side blur divs */}
<div className="xl:w-[640px] lg:w-[440px] md:w-[340px] sm:w-[240px] w-[140px] xl:h-[640px] lg:h-[440px] md:h-[340px] sm:h-[240px] h-[140px] aspect-square rounded-full bg-[#42A6F6] blur-[210px] absolute lg:top-[-280px] top-0 lg:-left-10 right-0 flex flex-col gap-40 -z-0" />

<div className="xl:w-[640px] lg:w-[440px] md:w-[340px] sm:w-[240px] w-[140px] xl:h-[640px] lg:h-[440px] md:h-[340px] sm:h-[240px] h-[140px] aspect-square rounded-full bg-[#EBF5FF] blur-[210px] absolute lg:top-[-200px] top-0 lg:-left-10 right-0 flex flex-col gap-40 -z-0" />

{/* Right side blur divs */}
<div className="xl:w-[640px] lg:w-[440px] md:w-[340px] sm:w-[240px] w-[140px] xl:h-[640px] lg:h-[440px] md:h-[340px] sm:h-[240px] h-[140px] aspect-square rounded-full bg-[#42A6F6] blur-[210px] absolute lg:top-[-280px] top-0 lg:-right-1 right-0 flex flex-col gap-40 -z-0" />

<div className="xl:w-[640px] lg:w-[440px] md:w-[340px] sm:w-[240px] w-[140px] xl:h-[640px] lg:h-[440px] md:h-[340px] sm:h-[240px] h-[140px] aspect-square rounded-full bg-[#EBF5FF] blur-[200px] absolute lg:top-[-200px] top-0 lg:-right-1 right-0 flex flex-col gap-40 -z-0" />
      <Navbar />
      <main className="flex-grow bg-[#F6FAFE]">{children}</main>
      <Footer />
    </div>
  );
}
