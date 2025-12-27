"use client"
import PageHeader from '@/components/dashboard/PageHeader'
import { useForm, Controller } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

function AddProduct() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            productName: '',
            manufacturer: '',
            productCategory: 'Biocide',
            intendedUse: 'Cooling',
            operatingPHMin: '',
            operatingPHMax: '',
            temperatureTolerance: '',
            maximumHardness: 'Treatment Chemical',
            compatibilityNotes: '',
            costPerUnit: '',
            averageConsumption: '4',
            consumptionUnit: 'ppm',
            replacementFrequency: 'Monthly'
        }
    });

    const onSubmit = (data: any) => {
        console.log('Product Form Data:', data);
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
    };
    return (
        <div>
            <div>
                <PageHeader title='Product Performance & Specifications' description='Enter operational product data used for system treatment and optimization.' />
            </div>
            {/* from section  */}
            <div className='bg-white p-6 mb-6 border border-[#E5E7EB] rounded-lg hover:shadow-sm'>
                {/* Product Identification Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-headingColor mb-2">Product</h1>
                    <h2 className="text-xl font-medium text-headingColor mb-4">Product Identification</h2>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter ph"
                                {...register('productName')}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Manufacturer */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Manufacturer
                            </label>
                            <input
                                type="text"
                                placeholder="Enter ph"
                                {...register('manufacturer')}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Product Category */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Product Category
                            </label>
                            <Controller
                                name="productCategory"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Biocide">Biocide</SelectItem>
                                            <SelectItem value="Corrosion Inhibitor">Treatment Chemical</SelectItem>
                                            <SelectItem value="Scale Inhibitor">Scale Inhibitor</SelectItem>
                                            <SelectItem value="pH Adjuster">pH Adjuster</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Intended Use
                            </label>
                            <Controller
                                name="intendedUse"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cooling">Cooling</SelectItem>
                                            <SelectItem value="Boiler">Boiler</SelectItem>
                                            <SelectItem value="Process Water">Process Water</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Performance Parameters Section */}
                <div className=" mb-6">
                    <h2 className="text-xl font-medium text-headingColor mb-4">Performance Parameters</h2>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Operating pH Range */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Operating pH Range
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Min"
                                    {...register('operatingPHMin')}
                                    className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                                />
                                <span className="text-gray-400">—</span>
                                <input
                                    type="text"
                                    placeholder="Max"
                                    {...register('operatingPHMax')}
                                    className="flex-1 px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                                />
                            </div>
                        </div>

                        {/* Temperature Tolerance (°C) */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Temperature Tolerance (°C)
                            </label>
                            <input
                                type="text"
                                placeholder="Enter ph"
                                {...register('temperatureTolerance')}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Maximum Hardness Allowed (ppm) */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Maximum Hardness Allowed (ppm)
                            </label>
                            <Controller
                                name="maximumHardness"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Treatment Chemical">Treatment Chemical</SelectItem>
                                            <SelectItem value="Testing Reagent">Testing Reagent</SelectItem>
                                            <SelectItem value="Cleaning Agent">Cleaning Agent</SelectItem>
                                            <SelectItem value="Additive">Additive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Compatibility Notes */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Compatibility Notes
                            </label>
                            <textarea
                                placeholder="Enter compatibility notes and restrictions..."
                                {...register('compatibilityNotes')}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                            />
                        </div>
                    </div>
                </div>

                {/* Cost & Consumption Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-medium text-headingColor mb-4">Cost & Consumption</h2>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Cost per Unit ($) */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Cost per Unit ($)
                            </label>
                            <input
                                type="text"
                                placeholder="Enter ph"
                                {...register('costPerUnit')}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Average Monthly Consumption */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Average Monthly Consumption
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    {...register('averageConsumption')}
                                    className="flex-1 w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                                />
                                <Controller
                                    name="consumptionUnit"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-24 px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ppm">ppm</SelectItem>
                                                <SelectItem value="mg/L">mg/L</SelectItem>
                                                <SelectItem value="mL/L">mL/L</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Replacement Frequency */}
                        <div>
                            <label className="block text-sm font-medium text-[#344054] mb-2">
                                Replacement Frequency
                            </label>
                            <Controller
                                name="replacementFrequency"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Daily">Daily</SelectItem>
                                            <SelectItem value="Weekly">Weekly</SelectItem>
                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                            <SelectItem value="Quarterly">Quarterly</SelectItem>
                                            <SelectItem value="Semi-Annually">Semi-Annually</SelectItem>
                                            <SelectItem value="Annually">Annually</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleFormSubmit}
                        className="px-6 py-3 bg-[#004AAD] text-white font-medium rounded-lg hover:bg-[#004AAD] transition-colors text-sm cursor-pointer"
                    >
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct