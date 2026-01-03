import PageHeader from '@/components/dashboard/PageHeader'
// import { ArrowRight } from 'lucide-react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

function Subscription() {
    return (
        <div>
            {/* header section  */}
            <PageHeader title='Subscription' description='Manage your plan' />
            {/* Subscription part  */}
            < div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6 justify-items-center'>
                <div className="bg-white rounded-[16px] w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] group">
                    <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                        <span className="text-primaryColor text-md font-semibold border-2 border-white group-hover:border-none shadow-sm px-8 py-1.5 rounded-full group-hover:text-white group-hover:bg-primaryColor cursor-pointer">Basic</span>
                        <p className="text-[#3C4049] text-sm mb-4 mt-6">
                            Best for individuals and small operations.
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-xl lg:text-[40px] font-medium text-[#2D2D2D]">Free</span>
                        </div>
                    </div>

                    <div className="mb-8 flex-1">
                        <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">AI calculation engine</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Basic reports</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Single-user access</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">10 monthly analyses</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                                    group-hover:bg-primaryColor group-hover:text-white"
                        style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                    >
                        <span>Current Plan</span>
                        {/* <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /> */}
                    </div>
                </div>
                <div className="bg-white rounded-[16px] w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] group">
                    <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                        <span className="text-primaryColor text-md font-semibold border-2 border-white group-hover:border-none shadow-sm px-8 py-1.5 rounded-full group-hover:text-white group-hover:bg-primaryColor cursor-pointer">Advance</span>
                        <p className="text-[#3C4049] text-sm mb-4 mt-6">
                            Ideal for growing teams. Ideal for growing teams.
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-xl lg:text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                            <span className="text-[#6A7381] text-[16px]">/ Monthly</span>
                        </div>
                    </div>

                    <div className="mb-8 flex-1">
                        <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Everything in Basic</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Full analysis modules</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Visual chemistry graphs</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Customer dashboard access</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">50 monthly analyses</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Priority support</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">3D view</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                                    group-hover:bg-primaryColor group-hover:text-white"
                        style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                    >
                        <span>Upgrade Plan</span>
                        {/* <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /> */}
                    </div>
                </div>
                <div className="bg-white rounded-[16px] w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] group">
                    <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                        <span className="text-primaryColor text-md font-semibold border-2 border-white group-hover:border-none shadow-sm px-8 py-1.5 rounded-full group-hover:text-white group-hover:bg-primaryColor cursor-pointer">Expert</span>
                        <p className="text-[#3C4049] text-sm mb-4 mt-6">
                            For enterprises and chemistry professionals.
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-xl lg:text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                            <span className="text-[#6A7381] text-[16px]">/ Monthly</span>
                        </div>
                    </div>

                    <div className="mb-8 flex-1">
                        <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Everything in Advanced</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Unlimited analyses</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Custom recommendations</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Advanced reporting</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Priority support</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <IoCheckmarkDoneOutline className="w-6 h-6 text-[#666666]" />
                                <span className="text-[#666666] text-sm font-semibold">Advanced Al insights & scripts</span>
                            </div>
                        </div>
                    </div>
                    {/* Button */}
                    <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                                     group-hover:bg-primaryColor group-hover:text-white"
                        style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                    >
                        <span>Upgrade Plan</span>
                        {/* <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription