// // import React from "react";

// // const AdminSetting = () => {
// //   return <div>setings</div>;
// // };

// // export default AdminSetting;

// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// interface ProfileFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// interface SecurityFormData {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// interface NotificationSettings {
//   emailNotifications: boolean;
//   meetingReminders: boolean;
//   aiInsights: boolean;
// }

// const AdminSettingsPage = () => {
//   const [notifications, setNotifications] = useState<NotificationSettings>({
//     emailNotifications: true,
//     meetingReminders: true,
//     aiInsights: true,
//   });

//   const profileForm = useForm<ProfileFormData>({
//     defaultValues: {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@company.com",
//     },
//   });

//   const securityForm = useForm<SecurityFormData>({
//     defaultValues: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const onProfileSubmit = (data: ProfileFormData) => {
//     console.log("Profile data:", data);
//     alert("Profile changes saved!");
//   };

//   const onSecuritySubmit = (data: SecurityFormData) => {
//     if (data.newPassword !== data.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log("Security data:", data);
//     alert("Security preferences saved!");
//     securityForm.reset();
//   };

//   const toggleNotification = (key: keyof NotificationSettings) => {
//     setNotifications((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <div className="mb-6">
//       <div className="space-y-6">
//         {/* Profile Information Section */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Profile Information
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Update your personal information
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   {...profileForm.register("firstName", { required: true })}
//                   className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   {...profileForm.register("lastName", { required: true })}
//                   className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 {...profileForm.register("email", { required: true })}
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               onClick={profileForm.handleSubmit(onProfileSubmit)}
//               className="rounded-md bg-primaryColor px-6 py-2 font-medium text-white transition-colors hover:bg-primaryColor"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>

//         {/* Notifications Section */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Notifications
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Configure how you receive notifications
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">
//                   Email Notifications
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Receive updates via email
//                 </p>
//               </div>
//               <button
//                 onClick={() => toggleNotification("emailNotifications")}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   notifications.emailNotifications
//                     ? "bg-primaryColor"
//                     : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications.emailNotifications
//                       ? "translate-x-6"
//                       : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">
//                   Meeting Reminders
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Get reminders before meetings
//                 </p>
//               </div>
//               <button
//                 onClick={() => toggleNotification("meetingReminders")}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   notifications.meetingReminders ? "bg-primaryColor" : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications.meetingReminders
//                       ? "translate-x-6"
//                       : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">AI Insights</p>
//                 <p className="text-sm text-gray-500">
//                   Receive AI-generated insights
//                 </p>
//               </div>
//               <button
//                 onClick={() => toggleNotification("aiInsights")}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   notifications.aiInsights ? "bg-primaryColor" : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications.aiInsights ? "translate-x-6" : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Security Section */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Security</h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Customize your experience
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Current Password
//               </label>
//               <input
//                 type="password"
//                 {...securityForm.register("currentPassword", {
//                   required: true,
//                 })}
//                 placeholder="************"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 {...securityForm.register("newPassword", { required: true })}
//                 placeholder="************"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 {...securityForm.register("confirmPassword", {
//                   required: true,
//                 })}
//                 placeholder="************"
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               onClick={securityForm.handleSubmit(onSecuritySubmit)}
//               className="rounded-md bg-primaryColor px-6 py-2 font-medium text-white transition-colors hover:bg-primaryColor"
//             >
//               Save Preferences
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSettingsPage;

"use client";

import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";

// Type definitions
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

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string>(
    "/default-avatar.jpg",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@company.com",
    },
  });

  // Security form
  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: securityErrors },
    watch,
    reset: resetSecurity,
  } = useForm<SecurityFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile form submission
  const onProfileSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log("Profile Data:", data);
    console.log("Image File:", imageFile);
    // Add your API call here
    // Example:
    // const formData = new FormData();
    // if (imageFile) formData.append('image', imageFile);
    // formData.append('firstName', data.firstName);
    // formData.append('lastName', data.lastName);
    // formData.append('email', data.email);
    // await fetch('/api/profile', { method: 'PUT', body: formData });

    alert("Profile changes saved successfully!");
  };

  // Handle security form submission
  const onSecuritySubmit: SubmitHandler<SecurityFormData> = (data) => {
    console.log("Security Data:", data);
    // Add your API call here
    // Example:
    // await fetch('/api/change-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     currentPassword: data.currentPassword,
    //     newPassword: data.newPassword,
    //   }),
    // });

    alert("Password changed successfully!");
    resetSecurity();
  };

  return (
    <div className="">
      <div className="space-y-10">
        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal information
              </p>
            </div>

            <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
              {/* Profile Image Upload */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-lg">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...registerProfile("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="John"
                  />
                  {profileErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...registerProfile("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Doe"
                  />
                  {profileErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...registerProfile("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="john@company.com"
                />
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {profileErrors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}

              <PrimaryButton
                type="submit"
                text="Save Changes"
                className="px-10 py-3"
              ></PrimaryButton>
            </form>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Security
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Customize your experience
              </p>
            </div>

            <form onSubmit={handleSubmitSecurity(onSecuritySubmit)}>
              {/* Current Password */}
              <div className="mb-6">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  {...registerSecurity("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="••••••••••"
                />
                {securityErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {securityErrors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...registerSecurity("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                    },
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="••••••••••"
                />
                {securityErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {securityErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="mb-8">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...registerSecurity("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value: string) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="••••••••••"
                />
                {securityErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {securityErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}

              <PrimaryButton
                type="submit"
                text="Save Preferences"
                className="px-10 py-3"
              ></PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
