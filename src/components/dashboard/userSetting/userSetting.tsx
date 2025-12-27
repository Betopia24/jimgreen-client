// import React from "react";

// const AdminSetting = () => {
//   return <div>setings</div>;
// };

// export default AdminSetting;

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  meetingReminders: boolean;
  aiInsights: boolean;
}

const AdminSettingsPage = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    meetingReminders: true,
    aiInsights: true,
  });

  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@company.com",
    },
  });

  const securityForm = useForm<SecurityFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
    alert("Profile changes saved!");
  };

  const onSecuritySubmit = (data: SecurityFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Security data:", data);
    alert("Security preferences saved!");
    securityForm.reset();
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="mb-6">
      <div className="space-y-6">
        {/* Profile Information Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your personal information
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  {...profileForm.register("firstName", { required: true })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  {...profileForm.register("lastName", { required: true })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...profileForm.register("email", { required: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={profileForm.handleSubmit(onProfileSubmit)}
              className="rounded-md bg-primaryColor px-6 py-2 font-medium text-white transition-colors hover:bg-primaryColor"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Configure how you receive notifications
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500">
                  Receive updates via email
                </p>
              </div>
              <button
                onClick={() => toggleNotification("emailNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.emailNotifications
                    ? "bg-primaryColor"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.emailNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Meeting Reminders
                </p>
                <p className="text-sm text-gray-500">
                  Get reminders before meetings
                </p>
              </div>
              <button
                onClick={() => toggleNotification("meetingReminders")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.meetingReminders ? "bg-primaryColor" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.meetingReminders
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">AI Insights</p>
                <p className="text-sm text-gray-500">
                  Receive AI-generated insights
                </p>
              </div>
              <button
                onClick={() => toggleNotification("aiInsights")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.aiInsights ? "bg-primaryColor" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.aiInsights ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            <p className="mt-1 text-sm text-gray-500">
              Customize your experience
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                {...securityForm.register("currentPassword", {
                  required: true,
                })}
                placeholder="************"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                {...securityForm.register("newPassword", { required: true })}
                placeholder="************"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                {...securityForm.register("confirmPassword", {
                  required: true,
                })}
                placeholder="************"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={securityForm.handleSubmit(onSecuritySubmit)}
              className="rounded-md bg-primaryColor px-6 py-2 font-medium text-white transition-colors hover:bg-primaryColor"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
