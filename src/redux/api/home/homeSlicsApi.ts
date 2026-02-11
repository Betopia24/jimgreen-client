import baseApi from "../baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeOverview: builder.query({
      query: () => ({
        url: `/analytics/owner-admin/dashboard-overview`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHomeOverviewQuery } = homeApi;
