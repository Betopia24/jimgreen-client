// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
// import { useSignUpMutation } from "@/redux/api/auth/authApi";
// import CustomInput from "@/ui/CustomeInput";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { GoogleLogin } from "@react-oauth/google";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
// import { useDispatch } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";
// import {
//   useGoogleLoginMutation,
//   useSignInMutation,
// } from "@/redux/api/auth/authApi";
// import { setUser } from "@/redux/features/user/userSlice";

// // Define Zod schema for validation
// const formSchema = z.object({
//   firstName: z.string().min(1, { message: "First name is required" }),
//   lastName: z.string().min(1, { message: "Last name is required" }),
//   email: z
//     .string()
//     .email({ message: "Please enter a valid company email address" })
//     .min(1, { message: "Company email is required" }),
//   password: z
//     .string()
//     .min(6, { message: "Password should be at least 6 characters long" })
//     .min(1, { message: "Password is required" }),
// });

// type FormValues = z.infer<typeof formSchema>;

// export default function SignUpPage() {
//   const [signUp, { isLoading }] = useSignUpMutation();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [googleSignIn] = useGoogleLoginMutation();

//   // Use React Hook Form with Zod resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       // confirmPassword: "",
//     },
//   });

//   const onSubmit = async (data: FormValues) => {
//     localStorage.setItem("email", data.email);
//     console.log("Form Data:", data);
//     const { ...rest } = data;

//     // Add role to the payload
//     const payload = {
//       ...rest,
//       role: "INDIVIDUAL",
//     };

//     try {
//       const response = await signUp(payload).unwrap();
//       if (response?.success) {
//         router.push("/otp");
//       }
//     } catch (error: any) {
//       console.error("Error during sign up:", error);
//       toast(error?.data?.message || "Sign up failed");
//     }
//   };

//   // google login working for functonalti
//   const handleSuccess = async (credentialResponse: any) => {
//     // console.log("yesTonek= ", credentialResponse);
//     try {
//       const googleToken = {
//         token: credentialResponse.credential,
//         provider: "GOOGLE",
//       };

//       const response = await googleSignIn(googleToken).unwrap();
//       console.log("response", response);

//       if (response?.success) {
//         // localStorage.setItem("accessToken", response?.data?.accessToken);
//         Cookies.set("accessToken", response?.data?.accessToken);
//         const decoded = jwtDecode(response?.data?.accessToken);

//         // const email = decoded.email;
//         // console.log("Google Email:", email);

//         // console.log(response?.data?.userData?.role);

//         dispatch(
//           setUser({
//             token: response.data.accessToken,
//           }),
//         );
//         toast.success(response?.message);
//         router.push("/dashboard");
//         // if (response?.data?.teeRegistration === null) {
//         //   router.push(`/role?email=${email}`);
//         // } else {
//         //   router.push("/new-project");
//         // }
//       }

//       console.log("Login successful", response.data);
//       // Handle successful login (store tokens, redirect, etc.)
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const onError = () => {
//     console.log("Login Failed");
//   };

//   return (
//     <div className="max-w-[540px] lg:w-[540px] h-auto mx-auto bg-[#FFF] p-6 rounded-2xl border border-[#6E51E01A] shadow-[0_0_20px_0_rgba(110,81,224,0.10)]">
//       <h3 className="font-bold text-3xl mb-6 text-[#2D2D2D]">
//         Create a new account
//       </h3>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
//         <div className="flex items-center gap-4">
//           {/* First Name Input */}
//           <CustomInput
//             id="firstName"
//             label="First Name"
//             placeholder="Enter first name"
//             error={errors.firstName?.message}
//             leftIcon={
//               <img
//                 src="/authImage/humanIcon.png"
//                 alt="icon"
//                 className="w-5 h-5"
//               />
//             }
//             {...register("firstName")}
//           />
//           {/* last Name Input */}
//           <CustomInput
//             id="lastName"
//             label="Last Name"
//             placeholder="Enter last name"
//             error={errors.lastName?.message}
//             leftIcon={
//               <img
//                 src="/authImage/humanIcon.png"
//                 alt="icon"
//                 className="w-5 h-5"
//               />
//             }
//             {...register("lastName")}
//           />
//         </div>
//         {/* Company Email Input */}
//         <CustomInput
//           id="email"
//           type="email"
//           label="Email"
//           placeholder="Enter your email"
//           error={errors.email?.message}
//           leftIcon={
//             <img src="/authImage/mailIcon.png" alt="icon" className="w-5 h-5" />
//           }
//           {...register("email")}
//         />

//         {/* Password Input */}
//         <CustomInput
//           id="password"
//           type="password"
//           label="Password"
//           // placeholder="••••••••••"
//           placeholder="Enter your password"
//           showPasswordToggle={true}
//           error={errors.password?.message}
//           leftIcon={
//             <img
//               src="/authImage/passwordIcon.png"
//               alt="icon"
//               className="w-5 h-5"
//             />
//           }
//           {...register("password")}
//         />
//         {/* Sign Up Button */}
//         <PrimaryButton
//           type="submit"
//           loading={isLoading}
//           text="Create Account"
//           className="w-full"
//         />
//       </form>

//       {/* Login Link */}
//       <div className="text-center mb-3 mt-3 text-[16px] text-gray-600">
//         Already have an account?{" "}
//         <Link
//           href="/signIn"
//           className="text-primaryColor text-[16px] font-semibold hover:underline"
//         >
//           Sign in
//         </Link>
//         <div className="flex items-center gap-4 w-[80%] mx-auto my-3">
//           <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
//           <span className="text-[16px] text-primaryColor">or</span>
//           <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
//         </div>
//         {/* <button
//             className="w-full flex items-center justify-center gap-3 border border-[#D1D6DB] rounded-md py-2.5 transition"
//           >
//             <img
//               src="/authImage/googleIcon.png"
//               alt="google icon"
//               className="w-5 h-5"
//             />
//             <span className="text-[#2D2D2D] font-medium text-[16px]">Sign in with Google</span>
//           </button> */}
//         <div className="">
//           <GoogleLogin
//             size="large"
//             onSuccess={handleSuccess}
//             onError={onError}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {
  useGoogleLoginMutation,
  useSignInMutation,
} from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import { Home, Locate, LocationEdit } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";

// Define Zod schema for validation with Company Name and Location
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  companyLocation: z.string().min(1, { message: "Location is required" }),
  email: z
    .string()
    .email({ message: "Please enter a valid company email address" })
    .min(1, { message: "Company email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [googleSignIn] = useGoogleLoginMutation();

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      companyLocation: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem("email", data.email);
    console.log("Form Data:", data);
    const { ...rest } = data;

    // Add role to the payload
    const payload = {
      ...rest,
      companyEmail: "riverdale33@example.com",
    };

    try {
      const response = await signUp(payload).unwrap();
      if (response?.success) {
        router.push("/otp?signup=signUp");
      }
    } catch (error: any) {
      console.error("Error during sign up:", error);
      toast(error?.data?.message || "Sign up failed");
    }
  };

  // google login working for functionality
  const handleSuccess = async (credentialResponse: any) => {
    try {
      const googleToken = {
        token: credentialResponse.credential,
        provider: "GOOGLE",
      };

      const response = await googleSignIn(googleToken).unwrap();
      console.log("response", response);

      if (response?.success) {
        Cookies.set("accessToken", response?.data?.accessToken);
        const decoded = jwtDecode(response?.data?.accessToken);

        dispatch(
          setUser({
            token: response.data.accessToken,
          }),
        );
        toast.success(response?.message);
        router.push("/dashboard");
      }

      console.log("Login successful", response.data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const onError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="max-w-[540px] lg:w-[540px] h-auto mx-auto bg-[#FFF] p-6 rounded-2xl border border-[#6E51E01A] shadow-[0_0_20px_0_rgba(110,81,224,0.10)]">
      <h3 className="font-bold text-3xl mb-6 text-[#2D2D2D]">
        Create a new account
      </h3>

      {/* User Information Section */}
      <p className="text-[#2D2D2D] font-medium text-base mb-4">
        User Information
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex items-center gap-4">
          {/* First Name Input */}
          <CustomInput
            id="firstName"
            label="First Name"
            placeholder="Enter first name"
            error={errors.firstName?.message}
            leftIcon={
              <img
                src="/authImage/humanIcon.png"
                alt="icon"
                className="w-5 h-5"
              />
            }
            {...register("firstName")}
          />
          {/* Last Name Input */}
          <CustomInput
            id="lastName"
            label="Last Name"
            placeholder="Enter last name"
            error={errors.lastName?.message}
            leftIcon={
              <img
                src="/authImage/humanIcon.png"
                alt="icon"
                className="w-5 h-5"
              />
            }
            {...register("lastName")}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Company Name Input */}
          <CustomInput
            id="companyName"
            label="Company Name"
            placeholder="Enter  Company Name"
            error={errors.companyName?.message}
            leftIcon={<Home size={18} />}
            {...register("companyName")}
          />
          {/* Location Input */}
          <CustomInput
            id="location"
            label="Location"
            placeholder="Enter your Location"
            error={errors.companyLocation?.message}
            leftIcon={<CiLocationOn size={18} />}
            {...register("companyLocation")}
          />
        </div>

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

        {/* Sign Up Button */}
        <PrimaryButton
          type="submit"
          loading={isLoading}
          text="Sign Up"
          className="w-full"
        />
      </form>

      {/* Login Link */}
      <div className="text-center mb-3 mt-3 text-[16px] text-gray-600">
        Already have an account?{" "}
        <Link
          href="/signIn"
          className="text-primaryColor text-[16px] font-semibold hover:underline"
        >
          Sign in
        </Link>
        <div className="flex items-center gap-4 w-[80%] mx-auto my-3">
          <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
          <span className="text-[16px] text-primaryColor">or</span>
          <div className="flex-1 h-[1px] bg-[#D1D6DB]" />
        </div>
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
