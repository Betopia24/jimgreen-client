'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Info } from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useRouter } from 'next/navigation';

interface WaterChemistryFormData {
    ph: string;
    calcium: string;
    magnesium: string;
    sodium: string;
    chloride: string;
    sulfate: string;
    iron: string;
    temperature: string;
    totalAlkalinity: string;
    tds: string;
}

export default function Recalculation() {
    const router = useRouter()
    const defaultValues = {
        ph: '',
        calcium: '',
        magnesium: '',
        sodium: '',
        chloride: '',
        sulfate: '',
        iron: '',
        temperature: '',
        totalAlkalinity: '',
        tds: '',
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<WaterChemistryFormData>({
        defaultValues
    });

    const onSubmit = (data: WaterChemistryFormData) => {
        console.log('Form submitted:', data);
        if(data.ph) {
            alert("data submited")
        }
        router.push("/dashboard/analysisInput/comparison")
        // Handle form submission here
        // You can send data to API or perform calculations
    };

    // const handleReset = () => {
    //     reset();
    // };

    const parameters = [
        {
            name: 'ph' as keyof WaterChemistryFormData,
            label: 'pH',
            unit: '',
            placeholder: 'Enter ph',
            validation: {
                required: 'pH is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'calcium' as keyof WaterChemistryFormData,
            label: 'Calcium (Ca)',
            unit: '(mg/L)',
            placeholder: 'Enter calcium (ca)',
            validation: {
                required: 'Calcium is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'magnesium' as keyof WaterChemistryFormData,
            label: 'Magnesium (Mg)',
            unit: '(mg/L)',
            placeholder: 'Enter magnesium (mg)',
            validation: {
                required: 'Magnesium is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'sodium' as keyof WaterChemistryFormData,
            label: 'Sodium (Na)',
            unit: '(mg/L)',
            placeholder: 'Enter sodium (na)',
            validation: {
                required: 'Sodium is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'chloride' as keyof WaterChemistryFormData,
            label: 'Chloride (Cl)',
            unit: '(mg/L)',
            placeholder: 'Enter chloride (cl)',
            validation: {
                required: 'Chloride is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'sulfate' as keyof WaterChemistryFormData,
            label: 'Sulfate (SO₄)',
            unit: '(mg/L)',
            placeholder: 'Enter sulfate (so₄)',
            validation: {
                required: 'Sulfate is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'iron' as keyof WaterChemistryFormData,
            label: 'Iron (Fe)',
            unit: '(mg/L)',
            placeholder: 'Enter iron (fe)',
            validation: {
                required: 'Iron is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'temperature' as keyof WaterChemistryFormData,
            label: 'Temperature',
            unit: '(°C)',
            placeholder: 'Enter temperature',
            validation: {
                required: 'Temperature is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'totalAlkalinity' as keyof WaterChemistryFormData,
            label: 'Total Alkalinity',
            unit: '(mg/L)',
            placeholder: 'Enter total alkalinity',
            validation: {
                required: 'Total Alkalinity is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
        {
            name: 'tds' as keyof WaterChemistryFormData,
            label: 'TDS',
            unit: '(mg/L)',
            placeholder: 'Enter tds',
            validation: {
                required: 'TDS is required',
                pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Please enter a valid number'
                }
            }
        },
    ];

    return (
        <div>
            <PageHeader
                title="Water Chemistry Analysis Input"
                description="Enter raw water chemistry values for comprehensive analysis"
            />
            <div className="bg-gray-50 pb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-3xl font-medium text-headingColor mb-6">
                        Water Chemistry Parameters
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {parameters.map((param, index) => (
                                <div key={index} className="flex flex-col">
                                    <label className="flex items-center gap-2 mb-2 text-[16px] font-medium text-headingColor">
                                        {param.label} {param.unit && <span className="text-[#666666] text-[16px]">{param.unit}</span>}
                                        <Info className="w-4 h-4 text-[#B4B4B4] cursor-help" />
                                    </label>
                                    <input
                                        type="text"
                                        {...register(param.name, param.validation)}
                                        placeholder={param.placeholder}
                                        className={`w-full px-4 py-3 bg-[#F3F3F3] rounded-[8px] placeholder-#B4B4B4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors[param.name] ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                    />
                                    {errors[param.name] && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors[param.name]?.message}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            {/* <button
                                type="button"
                                onClick={handleReset}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Reset
                            </button> */}
                            <button
                                type="submit"
                                className="px-4 py-3 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer"
                            >
                                Save Water Analysis
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}