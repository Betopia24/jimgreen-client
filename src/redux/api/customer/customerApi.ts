
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

        // get customer all customer
        getCustomer: builder.query({
            query: (companyId: string) => ({
                url: `/customers/company/${companyId}`,
                method: "GET", // fetch data
            }),
            providesTags: ["customer"],
        }),

        // get single customer 
        getSingleCustomer: builder.query({
            query: (customerId: string) => ({
                url: `/customers/${customerId}`,
                method: "GET",
            }),
            providesTags: ["customer"],
        }),

        // updated customer 
        getUpdateCustomer: builder.mutation({
            query: ({ customerId, updatedCustomer }: { customerId: any, updatedCustomer: any }) => ({
                url: `/customers/${customerId}`,
                method: "PUT",
                body: updatedCustomer,
            }),
            invalidatesTags: ["customer"],
        }),
        // customer delete 
        getDeleteCustomer: builder.mutation({
            query: (id: string) => ({
                url: `/customers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["customer"],
        })
    }),
});

export const { useAddCustomerMutation, useGetCustomerQuery, useGetSingleCustomerQuery, useGetUpdateCustomerMutation, useGetDeleteCustomerMutation } = customer;
