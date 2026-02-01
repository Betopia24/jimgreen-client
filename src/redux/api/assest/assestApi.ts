import baseApi from "../baseApi";
export const assest = baseApi.injectEndpoints({
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
    })
})

export const {useGetCreateAssestMutation} = assest