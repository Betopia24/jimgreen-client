"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useGetCreateAssestMutation } from "@/redux/api/assest/assestApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";

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

export default function AddAset() {
  const [open, setOpen] = useState(false);
  const customerId = useSelector((state: RootState) => state.customerId)
  // console.log(customerId, "==================")

  const [createAssest, { isLoading }] = useGetCreateAssestMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AssetFormData>({
    defaultValues: {
      assetName: "",
      locationZone: "Biocide",
      assetType: "",
      installationDate: undefined,
      systemVolume: "",
      operatingTemperature: "",
      flowRate: "",
      cyclesOfConcentration: "",
      materialType: "Carbon Steel",
      currentCondition: "Excellent",
      knownIssues: "",
    },
  });

  const onSubmit = async (data: AssetFormData) => {
    console.log("Asset Configuration Data:", data);

    const payload = {
      name: data?.assetName,
      type: data?.assetType, // "Cooling Tower", "Evaporative Condenser","Once-Through Cooling","Seawater Cooling Tower", "Adiabatic Cooler",
      location: data?.locationZone,
      installationDate: data?.installationDate,
      systemVolume: data?.systemVolume,
      flowRate: data?.flowRate,
      operatingTemperature: data?.operatingTemperature,
      cyclesOfConcentration: data?.cyclesOfConcentration,
      materialType: data?.materialType, // "Carbon Steel", "Stainless Steel", "Copper", "Galvanized Steel"
      currentCondition: data?.currentCondition,
      knownIssues: data?.knownIssues,
      customerId: customerId?.customerId,
    }
    try {
      const response = await createAssest(payload).unwrap();
      if (response.success === true) {
        toast.success("Asset added successfully");
      }
    } catch (error) {
      toast.error("Asset addition failed");
    }
  };

  return (
    <div className=" bg-gray-50 mb-6">
      <PageHeader
        title="Cooling Water Asset Configuration"
        description="Describe the physical cooling system assets used at your facility."
      />

      <div className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Asset</h2>

          {/* Asset Details Section */}
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Asset Details
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Name
                  </label>
                  <input
                    {...register("assetName")}
                    className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                    placeholder="Enter asset name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location / Zone
                  </label>
                  <input
                    {...register("locationZone")}
                    className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                    placeholder="Enter ph"
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cooling Tower">Cooling Tower</SelectItem>
                          <SelectItem value="Evaporative Condenser">Evaporative Condenser</SelectItem>
                          <SelectItem value="Once-Through Cooling">Once-Through Cooling</SelectItem>
                          <SelectItem value="Seawater Cooling Tower">Seawater Cooling Tower</SelectItem>
                          <SelectItem value="Adiabatic Cooler">Adiabatic Cooler</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3.5">
                    Installation Date
                  </label>

                  <Controller
                    name="installationDate"
                    control={control}
                    render={({ field }) => (
                      <>
                        <button
                          type="button"
                          onClick={() => setOpen((prev) => !prev)}
                          className={cn(
                            "flex justify-between items-center w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]",
                            !field.value && "text-gray-500"
                          )}
                        >
                          {field.value
                            ? format(field.value, "MM/dd/yyyy")
                            : "MM/DD/YYYY"}
                          <CalendarIcon className="w-4 h-4 text-gray-400 ml-2" />
                        </button>

                        {open && (
                          <div className="absolute z-50 mt-2 bg-white border rounded-lg shadow-lg">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen(false);
                              }}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operational Parameters Section */}
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Operational Parameters
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Volume (m³)
                </label>
                <input
                  {...register("systemVolume")}
                  className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                  placeholder="Enter ph"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flow Rate (m³/hr)
                </label>
                <input
                  {...register("flowRate")}
                  className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                  placeholder="Enter ph"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Temperature (°C)
                </label>
                <input
                  {...register("operatingTemperature")}
                  className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                  placeholder="Enter ph"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cycles of Concentration
                </label>
                <input
                  {...register("cyclesOfConcentration")}
                  className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                  placeholder="Enter ph"
                />
              </div>
            </div>
          </div>

          {/* Asset Condition Section */}
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Asset Condition
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Type
                </label>
                <Controller
                  name="materialType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Carbon Steel">Carbon Steel</SelectItem>
                        <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                        <SelectItem value="Copper">Copper</SelectItem>
                        <SelectItem value="Galvanized Steel">Galvanized Steel</SelectItem>
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Issues
              </label>
              <textarea
                {...register("knownIssues")}
                rows={4}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                placeholder="Describe any known issues, maintenance concerns, or performance problems..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-10">
            <button
              className="px-6 py-3 bg-[#004AAD] text-white font-medium rounded-lg hover:bg-[#004AAD] transition-colors text-sm cursor-pointer flex items-center gap-2"
            >
              {isLoading && (
                <>
                  <LuLoader
                    className={` animate-spin text-center absolutem text-white`}
                  />
                </>
              )}
              Save Water Analysis
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}