import baseApi from "../baseApi";

export const analysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadAnalysisFile: builder.mutation({
      query: (body) => ({
        url: "/report-analysis/water-reports/extract",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reportAnalysis"],
    }),

    analyzeReport: builder.mutation({
      query: (payload) => ({
        // url: `/report-analysis/analyze-report`,
        url: `/report-analysis/water-reports`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reportAnalysis"],
    }),

    modifyRepordGraph: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/water-reports/modify-graph`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reportAnalysis"],
    }),

    recalculateReportAnalysis: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/water-reports/recalculate`,
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

    getCoustomerAndAsetList: builder.query({
      query: (id) => ({
        url: `/report-analysis/company-overview/${id}`,
        method: "GET",
      }),
      providesTags: ["reportAnalysis"],
    }),

    // getReportHistory: builder.query({
    //   query: ({
    //     companyId,
    //     searchTerm,
    //     page = 1,
    //     limit = 10,
    //   }: {
    //     companyId: string;
    //     searchTerm?: string;
    //     page?: number;
    //     limit?: number;
    //   }) => ({
    //     url: `/report-analysis/water-reports?companyId=${companyId}`,
    //     method: "GET",
    //     params: {
    //       searchTerm,
    //       page,
    //       limit,
    //     },
    //   }),
    // }),

    getReportHistory: builder.query({
      query: ({
        companyId,
        searchTerm,
        page = 1,
        limit = 10,
      }: {
        companyId: string;
        searchTerm?: string;
        page?: number;
        limit?: number;
      }) => ({
        url: `/report-analysis/water-reports`,
        method: "GET",
        params: {
          companyId,
          ...(searchTerm && { searchTerm }),
          page,
          limit,
        },
      }),
    }),

    // get report history signle data
    getReportHistorySignle: builder.query({
      query: (id) => ({
        url: `/report-analysis/water-reports/${id}`,
        method: "GET",
      }),
    }),

    // saturation analysis
    saturatonAnalysis: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/saturation-analyses`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reportAnalysis"],
    }),

    getSaltSaturation: builder.query({
      query: () => ({
        url: `/report-analysis/saturation/available-salts`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadAnalysisFileMutation,
  useGetCoustomerListQuery,
  useAnalyzeReportMutation,
  useModifyRepordGraphMutation,
  useRecalculateReportAnalysisMutation,
  useGetReportHistoryQuery,
  useGetReportHistorySignleQuery,
  useGetCoustomerAndAsetListQuery,
  useSaturatonAnalysisMutation,
  useGetSaltSaturationQuery,
} = analysisApi;
