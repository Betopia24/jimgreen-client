"use client";

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useForgetPasswordMutation } from "@/redux/api/auth/authApi";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgetPassPage() {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    try {
      const response = await forgetPassword(data).unwrap();
      if (response?.success) {
        localStorage.setItem("email", data.email);
        console.log("OTP sent successfully");
        toast.success("OTP sent successfully to your email");
        router.push("/otp");
      }
      // router.push("/otp")
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  return (
    <div className="max-w-[540px] lg:w-[540px] h-auto mx-auto bg-[#FFF] p-6 rounded-2xl border border-[#6E51E01A] shadow-[0_0_20px_0_rgba(110,81,224,0.10)]">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-4">
          <Link href="/signIn" className="mb-4">
            <img
              src="/authImage/arrowIcon.png"
              alt="icon"
              className="w-4 h-4"
            />
          </Link>
          <h3 className="font-bold text-3xl mb-6 text-[#2D2D2D]">
            Reset Password
          </h3>
        </div>
        <p className="text-gray-500 text-[16px] text-center">
          Enter your email address, and we’ll send you a one-time password (OTP)
          to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Email Input */}
        <CustomInput
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          leftIcon={
            <img src="/authImage/mailIcon.png" alt="icon" className="w-5 h-5" />
          }
          {...register("email")}
        />

        {/* Login Button */}
        <PrimaryButton type="submit" loading={isLoading} text="Send Otp" />
      </form>

      {/* Register Link */}
      <div className="text-center mb-3 mt-3 text-[16px] text-gray-600">
        Remember your password?{" "}
        <Link
          href="/signIn"
          className="text-primaryColor text-[16px] font-semibold hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
