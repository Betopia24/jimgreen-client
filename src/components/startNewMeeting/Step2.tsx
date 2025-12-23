
"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { X, Plus } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

type Participant = {
  name: string;
  role: string;
  personality: string;
  note: string;
  decisionMaker: boolean;
  linkedin: string;
};

type FormValues = {
  participants: Participant[];
};

export default function Step2() {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      participants: [
        {
          name: "",
          role: "",
          // personality: "",
          note: "",
          decisionMaker: false,
          linkedin: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-2">Who Are You Meeting?</h2>
          <p className="text-[#64748B]">Add information about meeting participants</p>
        </div>

        {/* Participants */}
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="border border-[#D1D6DB] rounded-xl p-6 bg-white hover:shadow-sm transition-shadow"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#2D2D2D] text-xl">
                Participant {index + 1}
              </h3>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-[#64748B] hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              )}
            </div>

            {/* Name + Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D]">Name</label>
                <input
                  className="w-full border border-[#D1D6DB] mt-1 rounded-md px-3 py-2 focus:outline-none focus:border-[#6E51E0]"
                  placeholder="Sarah Miller"
                  {...register(`participants.${index}.name`)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#2D2D2D]">Role</label>
                <input
                  className="w-full border border-[#D1D6DB] mt-1 rounded-md px-3 py-2 focus:outline-none focus:border-[#6E51E0]"
                  placeholder="CMO"
                  {...register(`participants.${index}.role`)}
                />
              </div>
            </div>

            {/* LinkedIn + Personality */}
            <div className="mt-4">
              <div>
                <label className="text-sm font-medium text-[#2D2D2D]">LinkedIn Profile</label>
                <input
                  className="w-full border border-[#D1D6DB] mt-1 rounded-md px-3 py-2 focus:outline-none focus:border-[#6E51E0]"
                  placeholder="https://linkedin.com/..."
                  {...register(`participants.${index}.linkedin`)}
                />
              </div>

              {/* <div>
                <label className="text-sm font-medium text-[#2D2D2D]">Personality Traits</label>
                <Controller
                  name={`participants.${index}.personality`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full border border-[#D1D6DB] mt-1 rounded-md px-3 py-5 focus:outline-none focus:border-[#6E51E0]">
                        <SelectValue placeholder="Select personality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Analytical">Angry</SelectItem>
                        <SelectItem value="Driver">Arogant</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div> */}
            </div>

            {/* Decision Maker */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#6E51E0]"
                {...register(`participants.${index}.decisionMaker`)}
              />
              <label className="text-sm text-[#2D2D2D]">Is Decision Maker?</label>
            </div>

            {/* Note */}
            <div className="mt-4">
              <label className="text-sm font-medium text-[#2D2D2D]">Note</label>
              <textarea
                className="w-full border border-[#D1D6DB] rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-[#6E51E0]"
                placeholder="Write note here..."
                rows={3}
                {...register(`participants.${index}.note`)}
              />
            </div>
          </div>
        ))}

        {/* Add Another Participant */}
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              role: "",
              personality: "",
              note: "",
              decisionMaker: false,
              linkedin: "",
            })
          }
          className="w-full py-3 border border-[#D1D6DB] rounded-md flex items-center justify-center gap-2 hover:border-[#6E51E0] hover:bg-gray-50 transition-colors"
        >
          <Plus size={20} className="text-[#2D2D2D]" />
          <span className="text-[#2D2D2D] font-medium">Add Another Participant</span>
        </button>

        {/* Footer Buttons */}
        {/* <div className="flex justify-between mt-8">
          <button
            type="button"
            className="border border-[#D1D6DB] px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>

          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#6E51E0] text-white px-6 py-3 rounded-lg hover:bg-[#5940c7] transition-colors"
          >
            Next Step
          </button>
        </div> */}
      </div>
    </div>
  );
}

