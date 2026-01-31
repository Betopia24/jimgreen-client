import baseApi from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProducts: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    allProducts: builder.query({
      query: (id) => ({
        url: `/products/company/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getSignleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetSignleProductQuery,
  useUpdateProductsMutation,
  useAllProductsQuery,
} = productApi;
