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

    // get single customer
    getSingleAssest: builder.query({
      query: (showCustomerId) => ({
        url: `/assets/${showCustomerId}`,
        method: "GET",
      }),
      providesTags: ["assest"],
    }),

    // updated assest
    getUpdateAssest: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/assets/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["assest"],
    }),
    // customer delete
    getDeleteAssest: builder.mutation({
      query: (id) => ({
        url: `/assets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assest"],
    }),
  }),
});

export const {
  useGetCreateAssestMutation,
  useGetAssestQuery,
  useGetSingleAssestQuery,
  useGetUpdateAssestMutation,
  useGetDeleteAssestMutation,
} = customerAssest;
