/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import {
  useGoogleLoginMutation,
  useSignInMutation,
} from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

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
  const [googleSignIn] = useGoogleLoginMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    try {
      const response = await signIn(data).unwrap();
      console.log(response);
      if (response?.success) {
        Cookies.set("token", response.data.accessToken);
        dispatch(
          setUser({
            token: response.data.accessToken,
          }),
        );
        toast.success("Login successful");
        if (response?.data?.user?.role === "ADMIN") {
          router.push("http://localhost:3011/super-admin");
          // router.push("http://206.162.244.131:3017/super-admin");
        } else if (
          response?.data?.user?.role === "USER" &&
          response?.data?.user?.companyMember?.role === "owner"
        ) {
          // router.push("http://206.162.244.131:3017/admin");
          router.push("http://localhost:3011/admin");
        } else if (
          response?.data?.user?.role === "USER" &&
          response?.data?.user?.companyMember?.role === "member"
        ) {
          router.push("http://localhost:3008/dashboard");
          // router.push("http://206.162.244.131:3008/dashboard");
        }
      }
    } catch (error: any) {
      console.log("Error during sign-in:", error);
      return toast.error(error?.data?.message || "Login failed");
    }
  };

  // google login working for functonalti
  const handleSuccess = async (credentialResponse: any) => {
    // console.log("yesTonek= ", credentialResponse);
    try {
      const googleToken = {
        token: credentialResponse.credential,
        provider: "GOOGLE",
      };

      const response = await googleSignIn(googleToken).unwrap();
      console.log("response", response);

      if (response?.success) {
        // localStorage.setItem("accessToken", response?.data?.accessToken);
        Cookies.set("accessToken", response?.data?.accessToken);
        const decoded = jwtDecode(response?.data?.accessToken);

        // const email = decoded.email;
        // console.log("Google Email:", email);

        // console.log(response?.data?.userData?.role);

        dispatch(
          setUser({
            token: response.data.accessToken,
          }),
        );
        toast.success(response?.message);
        router.push("/dashboard");
        // if (response?.data?.teeRegistration === null) {
        //   router.push(`/role?email=${email}`);
        // } else {
        //   router.push("/new-project");
        // }
      }

      console.log("Login successful", response.data);
      // Handle successful login (store tokens, redirect, etc.)
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const onError = () => {
    console.log("Login Failed");
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
          leftIcon={
            <img src="/authImage/mailIcon.png" alt="icon" className="w-5 h-5" />
          }
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
          leftIcon={
            <img
              src="/authImage/passwordIcon.png"
              alt="icon"
              className="w-5 h-5"
            />
          }
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
        <PrimaryButton
          type="submit"
          loading={isLoading}
          text="Sign In"
          className="w-full"
        />
      </form>
      <div className="text-center mb-3 mt-3 text-[16px] text-gray-600">
        Don’t have an account?{" "}
        <Link
          href="/signUp"
          className="text-primaryColor text-[16px] font-semibold hover:underline"
        >
          Sign up
        </Link>
        <div className="flex items-center gap-4 w-[80%] mx-auto my-3">
          <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
          <span className="text-[16px] text-primaryColor">or</span>
          <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
        </div>
        {/* <button className="w-full flex items-center justify-center gap-3 border border-[#D1D6DB] rounded-md py-2.5 transition">
          <img
            src="/authImage/googleIcon.png"
            alt="google icon"
            className="w-5 h-5"
          />
          <span className="text-[#2D2D2D] font-medium text-[16px]">
            Sign in with Google
          </span>
        </button> */}
        <div className="">
          <GoogleLogin
            size="large"
            onSuccess={handleSuccess}
            onError={onError}
          />
        </div>
      </div>
    </div>
  );
}
