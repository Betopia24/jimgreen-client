import baseApi from "../baseApi";

export const analysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadAnalysisFile: builder.mutation({
      query: (body) => ({
        url: "/report-analysis/upload-report",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reportAnalysis"],
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
  useUploadAnalysisFileMutation,
  useDeleteProductMutation,
  useGetSignleProductQuery,
  useUpdateProductsMutation,
  useAllProductsQuery,
} = analysisApi;
