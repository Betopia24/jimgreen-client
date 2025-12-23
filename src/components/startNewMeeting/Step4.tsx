

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StepTitle from './stepTitle';

export default function MeetingPrepForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      meetingGoal: 'Discovery',
      questions: [
        { value: 'What are your current biggest challenges?' },
        { value: 'How do you measure success?' },
        { value: 'What is your timeline for implementation?' },
        { value: 'Who else is involved in the decision?' },
        { value: 'What is your budget allocated for this?' }
      ],
      personality: 'Nice',
      difficulty: 'Intermediate',
      methodology: 'MEDDIC',
      duration: '5 minutes'
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // Handle form submission here
  };

  const handleBack = () => {
    console.log('Back clicked');
    // Handle back navigation
  };

  return (
    <div className="bg-white rounded-lg w-full p-6 border border-[#D1D6DB]">
      {/* header  */}
      <StepTitle title="Meeting Objective" subtitle="Define your goals and strategy" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
            Meeting Goal
          </label>
          <Controller
            name="meetingGoal"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Discovery" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Discovery">Discovery</SelectItem>
                  <SelectItem value="Follow">Follow up Meeting </SelectItem>
                  <SelectItem value="Demo">Demo</SelectItem>
                  <SelectItem value="Closing">Closing </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
            Top 5 Discovery Questions
          </label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  type="text"
                  {...register(`questions.${index}.value`, {
                    required: 'Question is required'
                  })}
                  placeholder="Enter your question"
                  className="flex-1 px-3 py-2.5 text-[#636F85] text-sm border border-[#D1D6DB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#6E51E0] focus:border-transparent"
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ value: '' })}
            className="mt-3 flex items-center gap-2 text-[16px] text-[#2D2D2D] border border-[#D1D6DB] px-6 py-2.5 rounded-lg"
          >
            <Plus size={16} />
            Add Question
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
              Personality
            </label>
            <Controller
              name="personality"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select personality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nice">Nice</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Direct">Direct</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
              Difficulty Level
            </label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
              Sales Methodology
            </label>
            <Controller
              name="methodology"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="MEDDIC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEDDIC">MEDDIC</SelectItem>
                    <SelectItem value="challenger">CHALLENGER SALES</SelectItem>
                    <SelectItem value="bant">BANT</SelectItem>
                    <SelectItem value="spin">SPIN Selling</SelectItem>
                    <SelectItem value="meddpicc">MEDDPICC</SelectItem>
                    <SelectItem value="value selling">Value Selling</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
              Meeting Duration
            </label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="5 minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5 minutes">5 minutes</SelectItem>
                    <SelectItem value="10 minutes">10 minutes</SelectItem>
                    <SelectItem value="15 minutes">15 minutes</SelectItem>
                    <SelectItem value="20 minutes">20 minutes</SelectItem>
                    <SelectItem value="25 minutes">25 minutes</SelectItem>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="35 minutes">35 minutes</SelectItem>
                    <SelectItem value="40 minutes">40 minutes</SelectItem>
                    <SelectItem value="45 minutes">45 minutes</SelectItem>
                    <SelectItem value="50 minutes">50 minutes</SelectItem>
                    <SelectItem value="55 minutes">55 minutes</SelectItem>
                    <SelectItem value="60 minutes">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        {/* <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
          >
            Next Step
          </button>
        </div> */}
      </form>
    </div>
  );
}