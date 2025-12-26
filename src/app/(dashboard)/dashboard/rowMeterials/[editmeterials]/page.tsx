'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EditMaterials() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      chemicalName: '',
      chemicalType: 'Biocide',
      supplierName: '',
      dosageRate: '4',
      dosageUnit: 'ppm',
      feedFrequency: 'Daily',
      safetyClassification: 'Hazardous',
      specialHandling: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className=" py-6">
      <div className='bg-white rounded-lg'>
        <div className="p-6 mb-6">
          <h1 className="text-2xl font-semibold text-[#101828] mb-6">Chemical</h1>

          <h2 className="text-lg font-medium text-[#101828] mb-4">Treatment Chemical Details</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Chemical Name */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Chemical Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter ph"
                  {...register('chemicalName', { required: true })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Chemical Type */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Chemical Type
              </label>
              <Controller
                name="chemicalType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full bg-gray-50 border-gray-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Biocide">Biocide</SelectItem>
                      <SelectItem value="Corrosion Inhibitor">Corrosion Inhibitor</SelectItem>
                      <SelectItem value="Scale Inhibitor">Scale Inhibitor</SelectItem>
                      <SelectItem value="pH Adjuster">pH Adjuster</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                placeholder="Enter magnesium (mg)"
                {...register('supplierName')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Dosage Rate */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Dosage Rate
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register('dosageRate')}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <Controller
                  name="dosageUnit"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-24 bg-gray-50 border-gray-300">
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

            {/* Feed Frequency */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Feed Frequency
              </label>
              <Controller
                name="feedFrequency"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full bg-gray-50 border-gray-300">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="As Needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Safety Classification */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Safety Classification
              </label>
              <Controller
                name="safetyClassification"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full bg-gray-50 border-gray-300">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hazardous">Hazardous</SelectItem>
                      <SelectItem value="Non-Hazardous">Non-Hazardous</SelectItem>
                      <SelectItem value="Toxic">Toxic</SelectItem>
                      <SelectItem value="Corrosive">Corrosive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="p-6 mb-6">
          <h2 className="text-lg font-medium text-[#101828] mb-4">Additional Information</h2>

          <div>
            <label className="block text-sm font-medium text-[#344054] mb-2">
              Special Handling Instructions
            </label>
            <textarea
              placeholder="Enter any special handling requirements..."
              {...register('specialHandling')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleFormSubmit}
            className="px-6 py-3 bg-[#0058DD] text-white font-medium rounded-lg hover:bg-[#0046b8] transition-colors text-sm"
          >
            Save Raw Material
          </button>
        </div>
      </div>
    </div>
  );
}