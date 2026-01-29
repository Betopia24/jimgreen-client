import baseApi from "../baseApi";

export const rowMaterialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRowMaterials: builder.mutation({
      query: (body) => ({
        url: "/raw-materials",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RowMaterials"],
    }),

    updateRowMaterials: builder.mutation({
      query: ({ payload, meterialsId }) => ({
        url: `/raw-materials/${meterialsId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["RowMaterials"],
    }),

    allRowMaterials: builder.query({
      query: (id) => ({
        url: `/raw-materials/company/${id}`,
        method: "GET",
      }),
      providesTags: ["RowMaterials"],
    }),

    getSignleRowMaterials: builder.query({
      query: (id) => ({
        url: `/raw-materials/${id}`,
        method: "GET",
      }),
      providesTags: ["RowMaterials"],
    }),
  }),
});

export const {
  useCreateRowMaterialsMutation,
  useAllRowMaterialsQuery,
  useGetSignleRowMaterialsQuery,
  useUpdateRowMaterialsMutation,
} = rowMaterialsApi;
