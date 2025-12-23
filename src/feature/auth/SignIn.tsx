/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useSignInMutation } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signIn, { isLoading }] = useSignInMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data)
    try {
      const response = await signIn(data).unwrap();
      if (response?.success) {
        if (response.data.verify) {
          Cookies.set("token", response.data.accessToken);
          dispatch(
            setUser({
              token: response.data.accessToken,
            })
          );
          toast.success("Login successful");
          router.push("/");
        } else {
          router.push("/otp");
        }
      }
    } catch (error: any) {
      console.log("Error during sign-in:", error);
      return toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-[540px] lg:w-[540px] h-auto mx-auto bg-[#FFF] p-6 rounded-2xl border border-[#6E51E01A] shadow-[0_0_20px_0_rgba(110,81,224,0.10)]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Email Input */}
        <CustomInput
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          leftIcon={<img src="/authImage/mailIcon.png" alt="icon" className="w-5 h-5" />}
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Password Input */}
        <CustomInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          showPasswordToggle={true}
          error={errors.password?.message}
          leftIcon={<img src="/authImage/passwordIcon.png" alt="icon" className="w-5 h-5" />}
          {...register("password")}
        />

        {/* Remember Me and Forgot Password */}
        <div className="text-right">
          <Link
            href="/forget-password"
            className="text-sm text-[#000000] font-semibold text-[16px] hover:underline"
          >
            Reset Password
          </Link>
        </div>
        {/* Login Button */}
        <PrimaryButton type="submit" loading={isLoading} text="Sign In" />
      </form>
      <div className="text-center mb-3 mt-3 text-[16px] text-gray-600">
        Don’t have an account?{" "}
        <Link href="/signUp" className="text-primaryColor text-[16px] font-semibold hover:underline">
          Sign up
        </Link>
        <div className="flex items-center gap-4 w-[80%] mx-auto my-3">
          <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
          <span className="text-[16px] text-primaryColor">or</span>
          <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
        </div>
        <button
          className="w-full flex items-center justify-center gap-3 border border-[#D1D6DB] rounded-md py-2.5 transition"
        >
          <img
            src="/authImage/googleIcon.png"
            alt="google icon"
            className="w-5 h-5"
          />
          <span className="text-[#2D2D2D] font-medium text-[16px]">Sign in with Google</span>
        </button>

      </div>
    </div>
  );
}
