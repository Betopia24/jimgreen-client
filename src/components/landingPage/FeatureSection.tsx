import Container from "@/lib/Container"
import { LiaCloudSolid } from "react-icons/lia";
import { CiUser } from "react-icons/ci"


function FeatureSection() {
    return (
        <div
            className="pt-6 pb-[50px] md:pt-14 md:pb-[140px]"
        // style={{
        //     backgroundImage: "url('/landingPage/featureSection/FeatureSectionIamge.jpg')",
        //     backgroundPosition: "center",
        //     backgroundSize: "cover",
        //     backgroundRepeat: "no-repeat",
        // }}
        >
            {/* Header Section */}
            < div className="text-center px-3 md:px-0" >
                <p className="text-primaryColor font-semibold text-[16px] mb-3">
                    Core Feature
                </p>
                <h1 className="xs:text-lg sm:text-2xl md:text-4xl font-medium text-headingColor mb-3">
                    Why businesses love using <br />
                    our platform
                </h1>
                <p className="text-paragraphColor text-[16px]">
                    Powerful tools designed to modernize chemistry modeling, streamline workflows, and deliver crystal-clear insights.
                </p>
            </div >
            <Container className="mt-[60px] px-4 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div
                        className="bg-white rounded-2xl p-6 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step icon */}
                        <div className="inline-block bg-[#6366F133] rounded-lg px-3 py-3 mb-6">
                            <img src="/landingPage/featureSection/featureIcon1.svg" alt="" className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Interactive Graphs
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            Fully Integrated, Water Treatment Focused AI"  -  Use AI to help you understand your treatment program and results,
                            answer technical questions, build visualizations, and deliver insights to your customer.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step icon */}
                        <div className="inline-block bg-[#0058DD33] rounded-lg px-3 py-3 mb-6">
                            <img src="/landingPage/featureSection/featureIcon2.svg" alt="" className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Interactive Graphs With Deep-Dive Insights
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            Explore highly interactive 2D/3D charts where every bar and value is clickable, allowing you to view detailed explanations, behavior patterns.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step icon */}
                        <div className="inline-block bg-[#05966933] rounded-lg px-3 py-3 mb-6">
                            <img src="/landingPage/featureSection/featureIcon3.svg" alt="" className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Automated Report Builder With Drag-And-Drop Tools
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            Create professional reports using a flexible drag-and-drop interface—add charts, tables, notes, branding elements, and export everything instantly as a polished PDF.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step icon */}
                        <div className="inline-block bg-[#D9770633] rounded-lg px-3 py-3 mb-6">
                            <img src="/landingPage/featureSection/featureIcon4.svg" alt="" className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Intelligent Data Input System With OCR
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            Upload lab sheets, water samples, or handwritten data and let the system automatically extract values, clean the dataset.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step icon */}
                        <div className="inline-block bg-[#BA040D33] rounded-lg px-3 py-3 mb-6">
                            <CiUser className="w-5 h-5 text-[#BA040D]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Customer Dashboard With Role-Based Access
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            Share dashboards directly with clients, give them controlled access to their own chemistry history, insight trends, and recommended actions based on real.
                        </p>
                    </div>
                    <div
                        className="bg-white rounded-2xl p-6 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        {/* Step icon */}
                        <div className="inline-block bg-[#01AAA233] rounded-lg px-3 py-3 mb-6">
                            <LiaCloudSolid className="w-5 h-5 text-[#01AAA2]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-medium text-headingColor mb-4 leading-tight">
                            Fully Cloud-Based Platform With Real-Time Updates
                        </h3>

                        {/* Description */}
                        <p className="text-paragraphColor text-sm leading-relaxed">
                            Access your chemistry tools from anywhere, experience automatic updates, and enjoy enterprise-grade security with encrypted storage, compartmentalized data.
                        </p>
                    </div>
                </div>
            </Container>
        </div >
    )
}

export default FeatureSection