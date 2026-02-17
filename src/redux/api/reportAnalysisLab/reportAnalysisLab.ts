import baseApi from "../baseApi";

export const analysisLabApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    calculateWaterIndices: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/water/calculate-indices`,
        method: "POST",
        body: payload,
      }),
    }),

    calculateCoolingTowerIndices: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/water/cooling-tower`,
        method: "POST",
        body: payload,
      }),
    }),

    calculateBatchSaturationIndices: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/water/batch-saturation`,
        method: "POST",
        body: payload,
      }),
    }),

    calculateCorrosionRate: builder.mutation({
      query: (payload) => ({
        url: `/report-analysis/water/corrosion-rate`,
        method: "POST",
        body: payload,
      }),
    }),

  }),
});

export const {
  useCalculateWaterIndicesMutation,
  useCalculateCoolingTowerIndicesMutation,
  useCalculateBatchSaturationIndicesMutation,
  useCalculateCorrosionRateMutation,
} = analysisLabApi;
