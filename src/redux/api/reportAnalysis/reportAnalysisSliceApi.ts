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

    // get report history all data 
    getReportHistory: builder.query({
      query: (id) => ({
        url: `/report-analysis/history/${id}`,
        method: "GET",
      }),
    }),

    // get report history signle data
    getReportHistorySignle: builder.query({
      query: (id) => ({
        url: `/report-analysis/report/${id}`,
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
  useGetReportHistorySignleQuery,
} = analysisApi;
