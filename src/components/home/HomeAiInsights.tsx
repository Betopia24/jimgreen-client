import { Lightbulb } from "lucide-react";

function HomeAiInsights() {
    return (
        <div className="border border-[#6E51E0] rounded-xl bg-[#ECE9F8] p-6 mb-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-[#4A6CF7]" size={24} />
                <h2 className="text-[18px] font-semibold text-[#2D2D2D]">AI Insights</h2>
            </div>

            {/* Insights List */}
            <div>
                {/* Strength */}
                <div className="bg-white rounded-lg p-4 mb-3">
                    <div className="flex gap-3">
                        <span className="font-medium text-[#101010] text-[16px]">Strength:</span>
                        <p className="text-[#636F85] text-[16px]">You ask strong open-ended questions that encourage detailed responses.</p>
                    </div>
                </div>

                {/* Improvement */}
                <div className="bg-white rounded-lg p-4 mb-3">
                    <div className="flex gap-3">
                        <span className="font-semibold text-gray-900 whitespace-nowrap">Improvement:</span>
                        <p className="text-gray-600">Improve budget exploration in early calls. Only 30% of your discovery calls include budget discussion.</p>
                    </div>
                </div>

                {/* Pattern */}
                <div className="bg-white rounded-lg p-4">
                    <div className="flex gap-3">
                        <span className="font-semibold text-gray-900 whitespace-nowrap">Pattern:</span>
                        <p className="text-gray-600">Your qualification rate increases by 15% when you use SPIN methodology vs BANT.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAiInsights