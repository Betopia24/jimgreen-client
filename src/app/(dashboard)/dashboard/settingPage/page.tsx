"use client";

import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  notifications: {
    emailNotifications: boolean;
    meetingReminders: boolean;
    aiInsights: boolean;
  };
  preferences: {
    salesMethodology: string;
    difficultyLevel: string;
  };
};

export default function SettingPage() {
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@company.com",
      notifications: {
        emailNotifications: true,
        meetingReminders: true,
        aiInsights: true,
      },
      preferences: {
        salesMethodology: "SPIN Selling",
        difficultyLevel: "Intermediate",
      },
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Saved!");
  };

  return (
    <form className="space-y-6 py-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Profile Information */}
      <div className="p-4 border border-[#D1D6DB] rounded-lg bg-white shadow-sm hover:shadow-md transition">
        <h2 className="text-lg font-semibold text-[#2D2D2D]">
          Profile Information
        </h2>
        <p className="text-[#636F85] text-[16px] mb-4">
          Update your personal information
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[16px] text-[#2D2D2D] font-medium">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="border border-[#D1D6DB] px-3 py-1.5 rounded w-full mt-1 text-[#636F85]"
            />
          </div>

          <div>
            <label className="text-[16px] text-[#2D2D2D] font-medium">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="border border-[#D1D6DB] px-3 py-1.5 rounded w-full mt-1 text-[#636F85]"
            />
          </div>
        </div>

        <div className="my-6">
          <label className="text-[16px] text-[#2D2D2D] font-medium">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="border border-[#D1D6DB] px-3 py-1.5 rounded w-full mt-1 text-[#636F85]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#6E51E0] text-white px-4 py-2 rounded font-medium"
        >
          Save Changes
        </button>
      </div>

      {/* Notifications */}
      <div className="p-4 border border-[#D1D6DB] rounded-lg space-y-6 bg-white shadow-sm hover:shadow-md transition">
        <div>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-[16px] text-[#636F85]">
            Configure how you receive notifications
          </p>
        </div>

        {/* Email Notifications */}
        <Controller
          name="notifications.emailNotifications"
          control={control}
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <div>
                <p>Email Notifications</p>
                <p className="text-gray-500 text-sm">
                  Receive updates via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-[#6E51E0] data-[state=unchecked]:bg-[#64748B]"
              />
            </div>
          )}
        />

        {/* Meeting Reminders */}
        <Controller
          name="notifications.meetingReminders"
          control={control}
          render={({ field }) => (
            <div className="flex justify-between items-center border-y border-[#D1D6DB] py-6">
              <div>
                <p>Meeting Reminders</p>
                <p className="text-gray-500 text-sm">
                  Get reminders before meetings
                </p>
              </div>
              <Switch
                id="meetingReminders"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-[#6E51E0] data-[state=unchecked]:bg-[#64748B]"
              />
            </div>
          )}
        />

        {/* AI Insights */}
        <Controller
          name="notifications.aiInsights"
          control={control}
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <div>
                <p>AI Insights</p>
                <p className="text-gray-500 text-sm">
                  Receive AI-generated insights
                </p>
              </div>
              <Switch
                id="aiInsights"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-[#6E51E0] data-[state=unchecked]:bg-[#64748B]"
              />
            </div>
          )}
        />
      </div>

      {/* Preferences */}
      <div className="p-4 border border-[#D1D6DB] rounded-lg bg-white shadow-sm hover:shadow-md transition">
        <h2 className="text-lg font-semibold text-[#2D2D2D]">Preferences</h2>
        <p className="text-[16px] text-[#636F85] mb-6">
          Customize your experience
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
              Default Sales Methodology
            </label>
            <Controller
              name="preferences.salesMethodology"
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
                    <SelectItem value="SPIN Selling">SPIN Selling</SelectItem>
                    <SelectItem value="meddpicc">MEDDPICC</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2.5">
              Default Difficulty Level
            </label>
            <Controller
              name="preferences.difficultyLevel"
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

        <button
          type="submit"
          className="mt-6 bg-[#6E51E0] text-white px-4 py-2 rounded"
        >
          Save Preferences
        </button>
      </div>
    </form>
  );
}
