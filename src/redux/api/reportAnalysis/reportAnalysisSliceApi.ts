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
      invalidatesTags: ["Products"],
    }),

    getCoustomerList: builder.query({
      query: (id) => ({
        url: `/customers/company/${id}/list/`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getReportHistory: builder.query({
      query: (id) => ({
        url: `/report-analysis/history/${id}`,
        method: "GET",
      })
    })
  }),
});

export const {
  useUploadAnalysisFileMutation,
  useGetCoustomerListQuery,
  useAnalyzeReportMutation,
  useGetReportHistoryQuery,
} = analysisApi;
