
import baseApi from "../baseApi";

export const customer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // need to add types
        getMeProfile: builder.query({
            query: () => "/users/profile",
            providesTags: ["User"],
        }),
    }),
});

export const { useGetMeProfileQuery } = customer;
