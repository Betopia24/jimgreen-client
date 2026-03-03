"use client";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import { useGetHomeOverviewQuery } from "@/redux/api/home/homeSlicsApi";
import { setUser } from "@/redux/features/user/userSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function StatsCards() {
  const dispatch = useDispatch();
  const { data, isLoading: profielLoading } = useGetMeProfileQuery("");
  const { data: statsData } = useGetHomeOverviewQuery("");

  const allStats = statsData?.data?.reportStats;
  console.log(allStats);

  dispatch(setUser(data?.data));

  const stats = [
    {
      id: 2,
      title: "Total Analyses",
      value: `${allStats?.totalReports?.value || "-"} `,
      subtitle: `${allStats?.totalReports?.changePercent} calculations`,
      subtitleColor: "text-[#009D34]",
      image: "/dashboardImage/dashboard/cardImage1.svg",
    },
    {
      id: 2,
      title: "Last 30 Days",
      value: `${allStats?.monthlyReports?.value || "-"}`,
      subtitle: `${allStats?.monthlyReports?.changePercent} calculations`,
      subtitleColor: "text-[#009D34]",
      image: "/dashboardImage/dashboard/cardImage2.svg",
    },
    {
      id: 3,
      title: "Active Clients",
      // value: "123",
      // subtitle: "+23 this month",
      value: `${allStats?.monthlyReports?.value || "-"}`,
      subtitle: `${allStats?.monthlyReports?.changePercent} this month`,
      subtitleColor: "text-[#009D34]",
      image: "/dashboardImage/dashboard/cardImage3.svg",
    },
    {
      id: 4,
      title: "Pending Reports",
      // value: "1,247",
      // subtitle: "-2 from yesterday",
      value: `${allStats?.monthlyCustomers?.value || "-"}`,
      subtitle: `${allStats?.monthlyCustomers?.todayIncrease} from yesterday`,
      subtitleColor: "text-[#F40004]",
      image: "/dashboardImage/dashboard/cardImage4.svg",
    },
  ];

  return (
    <div className="w-full bg-gray-50 pt-6">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            return (
              <div
                key={stat.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-[16px] text-[#636F85] font-medium mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-medium text-[#2D2D2D]">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={stat.image}
                      alt={stat.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className={`text-sm font-medium ${stat.subtitleColor}`}>
                  {stat.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
