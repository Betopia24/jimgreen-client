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

    // signIn: builder.query({
    //   query: (body) => ({
    //     url: "/auth/login",
    //     method: "GET",
    //     body,
    //   }),
    // }),
  }),
});

export const { useCreateRowMaterialsMutation } = rowMaterialsApi;
