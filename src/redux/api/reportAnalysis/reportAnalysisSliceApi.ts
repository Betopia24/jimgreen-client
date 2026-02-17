import baseApi from "../baseApi";

export const analysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadAnalysisFile: builder.mutation({
      query: (body) => ({
        url: "/report-analysis/extract-report",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reportAnalysis"],
    }),

    analyzeReport: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/analyze-report`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reportAnalysis"],
    }),

    modifyRepordGraph: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/modify-report-graph`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reportAnalysis"],
    }),

    getCoustomerList: builder.query({
      query: (id) => ({
        url: `/customers/company/${id}/list/`,
        method: "GET",
      }),
      providesTags: ["reportAnalysis"],
    }),
  }),
});

export const {
  useUploadAnalysisFileMutation,
  useGetCoustomerListQuery,
  useAnalyzeReportMutation,
  useModifyRepordGraphMutation,
} = analysisApi;
