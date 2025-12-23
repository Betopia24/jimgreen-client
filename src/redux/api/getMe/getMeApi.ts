import { UserProfile } from "@/interfaces/global";
import baseApi from "../baseApi";

export const getMe = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // need to add types
    getMe: builder.query({
      query: () => "/user/get-me",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery } = getMe;
