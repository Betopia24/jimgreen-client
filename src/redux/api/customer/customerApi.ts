
import baseApi from "../baseApi";

export const customer = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // add customer 
        addCustomer: builder.mutation({
            query: (body) => ({
                url: "/customers",
                method: "POST",
                body,
            }),
            invalidatesTags: ["customer"],
        }),
    }),
});

export const { useAddCustomerMutation } = customer;
