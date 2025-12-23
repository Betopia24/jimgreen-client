
"use client"
import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function BussinessSection() {
    const [on, setOn] = useState(false);

    return (
        <div className='max-w-[1040px] mx-auto'>
            <div className='pt-6 md:pt-14'>
                < div className="text-center px-3 md:px-0" >
                    <h3 className="text-3xl md:text-5xl font-medium text-[#2D2D2D]">
                        Our Plans scale
                    </h3>
                    <div className='flex items-center justify-center gap-2'>
                        <h3 className="text-3xl md:text-5xl font-medium text-[#2D2D2D] mb-3">
                            with your
                        </h3>
                        <button className='text-3xl md:text-5xl text-[#6E51E0] font-medium bg-[#FCF1FE] px-2 py-1 md:px-[10px] md:py-[14px] rounded-sm'>Business</button>
                        <img src="/landingPage/bussinessSection/bussinessSectionImage.png" alt="" className='hidden md:flex'/>
                    </div>
                </div >
                <div className='my-12 flex items-center justify-center gap-4'>
                    <p className='text-[16px] text-[#2D2D2D]'>Monthly</p>
                    <button
                        onClick={() => setOn(!on)}
                        className={`w-14 h-8 rounded-full relative flex items-center p-1 transition-all cursor-pointer
                           ${on ? "bg-primaryBgColor" : "bg-primaryBgColor"}
                         `}
                    >
                        <span
                            className={`w-6 h-6 bg-white rounded-full transition-all duration-300
                             ${on ? "translate-x-6" : ""}
                           `}
                        ></span>
                    </button>
                    <p className='text-[16px] text-[#2D2D2D]'>Yearly</p>
                    <p className='text-[#6E51E0] text-sm border rounded-full px-3 py-1'>30% Off</p>
                </div>
            </div>
            {/* -------------------- CONDITIONAL CARDS -------------------- */}
            {on ? (
                < div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 justify-items-center'>
                    <div className="bg-white rounded-[16px] max-w-sm w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105">
                        <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                            <span className="text-[#6E51E0] text-md font-semibold border-2 border-white hover:border-none shadow-sm px-8 py-1.5 rounded-full hover:text-white hover:bg-primaryBgColor cursor-pointer">Basic</span>
                            <p className="text-[#3C4049] text-sm mb-4 mt-6">
                                The Slate necessities. Every thing you need to get up and running.
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                                <span className="text-[#6A7381] text-[16px]">/ Yearly</span>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                            <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">3 meeting preparations per month</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Basic company insightsZ</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Meeting summary export</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Email support</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                         hover:bg-primaryBgColor hover:text-white"
                            style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="bg-white rounded-[16px] max-w-sm w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105">
                        <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                            <span className="text-[#6E51E0] text-md font-semibold border-2 border-white hover:border-none shadow-sm px-8 py-1.5 rounded-full hover:text-white hover:bg-primaryBgColor cursor-pointer">Basic</span>
                            <p className="text-[#3C4049] text-sm mb-4 mt-6">
                                The Slate necessities. Every thing you need to get up and running.
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                                <span className="text-[#6A7381] text-[16px]">/ Yearly</span>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                            <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Unlimited meeting preparations</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Advanced Al insights & scripts</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">-ompetitor analysis</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Risk alerts & red flags</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Meeting templates</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Priority support</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Team collaboration (coming soon)</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                         hover:bg-primaryBgColor hover:text-white"
                            style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="bg-white rounded-[16px] max-w-sm w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105">
                        <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                            <span className="text-[#6E51E0] text-md font-semibold border-2 border-white hover:border-none shadow-sm px-8 py-1.5 rounded-full hover:text-white hover:bg-primaryBgColor cursor-pointer">Basic</span>
                            <p className="text-[#3C4049] text-sm mb-4 mt-6">
                                The Slate necessities. Every thing you need to get up and running.
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                                <span className="text-[#6A7381] text-[16px]">/ Yearly</span>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                            <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Unlimited meeting preparations</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Team collaboration (coming soon)</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">-ompetitor analysis</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Risk alerts & red flags</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Priority support</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Advanced Al insights & scripts</span>
                                </div>
                            </div>
                        </div>
                        {/* Button */}
                        <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                         hover:bg-primaryBgColor hover:text-white"
                            style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            ) : (
                < div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 justify-items-center'>
                    <div className="bg-white rounded-[16px] max-w-sm w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105">
                        <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                            <span className="text-[#6E51E0] text-md font-semibold border-2 border-white hover:border-none shadow-sm px-8 py-1.5 rounded-full hover:text-white hover:bg-primaryBgColor cursor-pointer">Basic</span>
                            <p className="text-[#3C4049] text-sm mb-4 mt-6">
                                The Slate necessities. Every thing you need to get up and running.
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                                <span className="text-[#6A7381] text-[16px]">/ Monthly</span>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                            <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">3 meeting preparations per month</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Basic company insightsZ</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Meeting summary export</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Email support</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                         hover:bg-primaryBgColor hover:text-white"
                            style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="bg-white rounded-[16px] max-w-sm w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105">
                        <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                            <span className="text-[#6E51E0] text-md font-semibold border-2 border-white hover:border-none shadow-sm px-8 py-1.5 rounded-full hover:text-white hover:bg-primaryBgColor cursor-pointer">Basic</span>
                            <p className="text-[#3C4049] text-sm mb-4 mt-6">
                                The Slate necessities. Every thing you need to get up and running.
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                                <span className="text-[#6A7381] text-[16px]">/ Monthly</span>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                            <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Unlimited meeting preparations</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Advanced Al insights & scripts</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">-ompetitor analysis</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Risk alerts & red flags</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Meeting templates</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Priority support</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Team collaboration (coming soon)</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                         hover:bg-primaryBgColor hover:text-white"
                            style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="bg-white rounded-[16px] max-w-sm w-full p-6 flex flex-col transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105">
                        <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                            <span className="text-[#6E51E0] text-md font-semibold border-2 border-white hover:border-none shadow-sm px-8 py-1.5 rounded-full hover:text-white hover:bg-primaryBgColor cursor-pointer">Basic</span>
                            <p className="text-[#3C4049] text-sm mb-4 mt-6">
                                The Slate necessities. Every thing you need to get up and running.
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-[40px] font-medium text-[#2D2D2D]">$16.00</span>
                                <span className="text-[#6A7381] text-[16px]">/ Monthly</span>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                            <h4 className="text-[#2D2D2D] font-semibold text-[16px] mb-4">Featured Include :</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Unlimited meeting preparations</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Team collaboration (coming soon)</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">-ompetitor analysis</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Risk alerts & red flags</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Priority support</span>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoCheckmarkDoneOutline className="w-6 h-6 text-[#6A7381]" />
                                    <span className="text-[#636F85] text-sm font-semibold">Advanced Al insights & scripts</span>
                                </div>
                            </div>
                        </div>
                        {/* Button */}
                        <div className="w-full py-2 bg-[#FBFBFB] border border-gray-200 text-sm text-[#2D2D2D] font-medium rounded-full flex items-center justify-center cursor-pointer transition
                                         hover:bg-primaryBgColor hover:text-white"
                            style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -1px 2px rgba(255, 255, 255, 0.5)' }}
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default BussinessSection;
