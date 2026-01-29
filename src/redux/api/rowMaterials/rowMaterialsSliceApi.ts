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

    allRowMaterials: builder.query({
      query: (id) => ({
        url: `/raw-materials/company/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateRowMaterialsMutation, useAllRowMaterialsQuery } =
  rowMaterialsApi;
