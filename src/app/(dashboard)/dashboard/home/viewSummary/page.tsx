import { ArrowRight, BarChart3, Calendar, Clock, Lightbulb, Play, User } from 'lucide-react';
import { CiCircleCheck } from "react-icons/ci";

function ViewSummary() {
    const qualifications = [
        {
            number: 1,
            title: "Metrics",
            description: "Sarah Miller has $150K allocated for Q1 and can make final approval decisions without additional stakeholders."
        },
        {
            number: 2,
            title: "Economic Buyer",
            description: "Manual reporting processes are taking 15+ hours per week and causing delays in decision-making across the sales team."
        },
        {
            number: 3,
            title: "Decision Criteria",
            description: "Need to implement a solution before end of Q1 to meet board-mandated efficiency targets. Timeline is aggressive but achievable."
        },
        {
            number: 4,
            title: "Decision Process",
            description: "Need to implement a solution before end of Q1 to meet board-mandated efficiency targets. Timeline is aggressive but achievable."
        },
        {
            number: 5,
            title: "Identify Pain",
            description: "Need to implement a solution before end of Q1 to meet board-mandated efficiency targets. Timeline is aggressive but achievable."
        },
        {
            number: 6,
            title: "Champion",
            description: "Need to implement a solution before end of Q1 to meet board-mandated efficiency targets. Timeline is aggressive but achievable."
        },
    ];
    const nextSteps = [
        {
            number: 1,
            title: "Technical Demo",
            subtitle: "Tuesday, Feb 2 at 2:00 PM PST"
        },
        {
            number: 2,
            title: "Pricing Discussion",
            subtitle: "Following successful demo"
        },
        {
            number: 3,
            title: "Stakeholder Alignment",
            subtitle: "Week of Feb 8"
        },
        {
            number: 4,
            title: "Contract Review",
            subtitle: "Target: End of Q"
        }
    ];
    return (
        <div>
            {/* title part  */}
            <div className="bg-white border border-[#6E51E0] rounded-[12px] p-6 my-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className="text-2xl font-medium text-[#2D2D2D] mb-4">
                            Discovery Call with CMO
                        </h1>

                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 mb-1" />
                                <span className='text-[#636F85] text-sm'>Jan 23</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 mb-1" />
                                <span className='text-[#636F85] text-sm'>42 minutes</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 mb-1" />
                                <span className='text-[#636F85] text-sm'>Sarah Miller</span>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="bg-[#6E51E0]/10 text-[#6E51E0] p-3 rounded-[8px] font-medium text-sm whitespace-nowrap">
                            Overall Score: 78/100
                        </div>
                    </div>
                </div>
            </div>
            {/* deal qualification part  */}
            <div className="bg-white rounded-[12px] p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-6 h-6 text-[#D08700]" />
                    {/* <h2 className="text-xl font-semibold text-[#2D2D2D]">Deal Qualification</h2> */}
                    <h2 className="text-xl font-semibold text-[#2D2D2D]">MEDDIC </h2>
                </div>
                <div className="space-y-3">
                    {qualifications.map((item) => (
                        <div key={item.number} className="bg-yellow-50 border border-yellow-100 rounded-[6px] p-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-[#FEF9C2] text-[#A65F00] rounded-full font-semibold text-[16px] flex items-center justify-center">
                                    {item.number}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[#101010] text-[16px] font-medium mb-1">
                                        {item.title}
                                    </h3>
                                    {/* <p className="text-sm text-[#636F85] leading-relaxed">
                                        {item.description}
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* key points  */}
            <div className="bg-white rounded-[12px] p-6 my-6">
                <div className="flex items-center gap-2 mb-3">
                    <CiCircleCheck className="w-6 h-6 text-[#00A63E]" />
                    <h2 className="text-xl font-semibold text-[#2D2D2D]">Key Points</h2>
                </div>

                <div className="space-y-3">
                    <div className="bg-green-50 border-l-8 border-[#00A63E] py-6 px-2 rounded-l-[8px]">
                        <div className="flex gap-1.5">
                            <CiCircleCheck className="w-6 h-6 text-[#00A63E]" />
                            <p className="text-sm text-[#636F85]">
                                Schedule technical demo with engineering team for next Tuesday at 2 PM PST
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-50 border-l-8 border-[#00A63E] py-6 px-2 rounded-l-[8px]">
                        <div className="flex gap-1.5">
                            <CiCircleCheck className="w-6 h-6 text-[#00A63E]" />
                            <p className="text-sm text-[#636F85]">
                                Move forward with Enterprise plan pricing discussion after successful demo
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-50 border-l-8 border-[#00A63E] py-6 px-2 rounded-l-[8px]">
                        <div className="flex gap-1.5">
                            <CiCircleCheck className="w-6 h-6 text-[#00A63E]" />
                            <p className="text-sm text-[#636F85]">
                                Include VP of Operations in next meeting to discuss implementation timeline
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* next steps  */}
            <div className="bg-white rounded-[12px] border border-[#D1D6DB] p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <ArrowRight className="w-6 h-6 text-[#9810FA]" />
                    <h2 className="text-xl font-semibold text-[#2D2D2D]">Next Steps</h2>
                </div>

                <div className="space-y-4">
                    {nextSteps.map((step) => (
                        <div key={step.number} className="bg-[#FAF5FF] p-4 rounded-sm">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 bg-[#F3E8FF] text-[#9810FA] rounded-full font-semibold text-[16px] flex items-center justify-center">
                                    {step.number}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[#101010] text-[16px] font-medium mb-1">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-[#636F85] leading-relaxed">
                                        {step.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* button part  */}
            <div className="flex gap-6 mb-6">
                <button className="flex-1 bg-white border border-[#D1D6DB] hover:border-[#6E51E0] text-[#0A0A0A] text-[16px] font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Play className="w-5 h-5" />
                    Watch Replay
                </button>
                <button className="flex-1 bg-white border border-[#D1D6DB] hover:border-[#6E51E0] text-[#0A0A0A] text-[16px] font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <BarChart3 className="w-5 h-5" />
                    View Insights
                </button>
            </div>
        </div>
    )
}

export default ViewSummary