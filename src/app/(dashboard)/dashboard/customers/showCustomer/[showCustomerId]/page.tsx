// import React from 'react'

// function ShowCustomerEdit() {
//   return (
//     <div>ShowCustomerEdit</div>
//   )
// }

// export default ShowCustomerEdit

"use client";

import PageHeader from '@/components/dashboard/PageHeader';
import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar'; // assuming you have a calendar popover component
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // common utility for className merging (if using shadcn)

interface AssetFormData {
  assetName: string;
  locationZone: string;
  assetType: string;
  installationDate: Date | undefined;
  systemVolume: string;
  operatingTemperature: string;
  flowRate: string;
  cyclesOfConcentration: string;
  materialType: string;
  currentCondition: string;
  knownIssues: string;
}

export default function CoolingWaterAssetConfiguration() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AssetFormData>({
    defaultValues: {
      assetName: '',
      locationZone: 'Biocide',
      assetType: '',
      installationDate: undefined,
      systemVolume: '',
      operatingTemperature: '',
      flowRate: '',
      cyclesOfConcentration: '',
      materialType: 'Carbon Steel',
      currentCondition: 'excellent',
      knownIssues: '',
    },
  });

  const installationDate = watch('installationDate');

  const onSubmit = (data: AssetFormData) => {
    console.log('Asset Configuration Data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Cooling Water Asset Configuration"
        description="Describe the physical cooling system assets used at your facility."
      />

      <div className="max-w-5xl mx-auto mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          {/* Asset Header with Icon */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Asset</h2>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              J
            </div>
          </div>

          {/* Asset Details Section */}
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Asset Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ph"
                    {...register('assetName')}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location / Zone
                  </label>
                  <input
                    type="text"
                    defaultValue="Biocide"
                    {...register('locationZone')}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Type
                  </label>
                  <Controller
                    name="assetType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cooling-tower">Cooling Tower</SelectItem>
                          <SelectItem value="heat-exchanger">Heat Exchanger</SelectItem>
                          <SelectItem value="chiller">Chiller</SelectItem>
                          <SelectItem value="pump">Pump</SelectItem>
                          <SelectItem value="piping">Piping</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Installation Date
                  </label>
                  <Controller
                    name="installationDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              "w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-left text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500",
                              !field.value && "text-gray-500"
                            )}
                          >
                            {field.value ? format(field.value, "MM/dd/yyyy") : "MM/DD/YYYY"}
                            <CalendarIcon className="w-5 h-5 text-gray-400" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operational Parameters Section */}
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Operational Parameters</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Volume (m³)
                </label>
                <input
                  type="text"
                  placeholder="Enter ph"
                  {...register('systemVolume')}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flow Rate (m³/hr)
                </label>
                <input
                  type="text"
                  placeholder="Enter ph"
                  {...register('flowRate')}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Temperature (°C)
                </label>
                <input
                  type="text"
                  placeholder="Enter ph"
                  {...register('operatingTemperature')}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cycles of Concentration
                </label>
                <input
                  type="text"
                  placeholder="Enter ph"
                  {...register('cyclesOfConcentration')}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Asset Condition Section */}
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Asset Condition</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Type
                </label>
                <Controller
                  name="materialType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Carbon Steel">Carbon Steel</SelectItem>
                        <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                        <SelectItem value="Copper">Copper</SelectItem>
                        <SelectItem value="Galvanized Steel">Galvanized Steel</SelectItem>
                        <SelectItem value="Plastic">Plastic</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Condition
                </label>
                <Controller
                  name="currentCondition"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Issues
              </label>
              <textarea
                rows={4}
                placeholder="Describe any known issues, maintenance concerns, or performance problems..."
                {...register('knownIssues')}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
            >
              Save Water Analysis
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}