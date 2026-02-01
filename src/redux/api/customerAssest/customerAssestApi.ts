import baseApi from "../baseApi";
export const customerAssest = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // add customer 
        getCreateAssest: builder.mutation({
            query: (body) => ({
                url: "/assets",
                method: "POST",
                body,
            }),
            invalidatesTags: ["assest"],
        }),

        // get all assest
        getAssest: builder.query({
            query: (customerId: string) => ({
                url: `/assets/customer/${customerId}`,
                method: "GET", // fetch data
            }),
            providesTags: ["assest"],
        }),
    })
})

export const {useGetCreateAssestMutation, useGetAssestQuery} = customerAssest