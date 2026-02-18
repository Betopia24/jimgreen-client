// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// const getRatingColor = (rating: string) => {
//   switch (rating) {
//     case "Excellent":
//       return "bg-green-100 text-green-700";
//     case "Good":
//       return "bg-blue-100 text-blue-700";
//     case "Fair":
//       return "bg-yellow-100 text-yellow-700";
//     case "Poor":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-gray-100 text-gray-700";
//   }
// };

// const CorrosionResults = () => {
//   const predictions = useSelector(
//     (state: RootState) => state.analysisLab.corrsion,
//   );
//   console.log(predictions);

//   if (!predictions?.length) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No corrosion results available
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {predictions.map((item, index) => (
//         <div key={index} className="bg-white rounded-xl shadow-md p-5 border">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             {/* Metal Type */}
//             <div>
//               <h3 className="text-lg font-semibold capitalize">
//                 {item.metal_type.replace("_", " ")}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Corrosion Prediction Result
//               </p>
//             </div>

//             {/* Rating Badge */}
//             <div
//               className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
//                 item.rating,
//               )}`}
//             >
//               {item.rating}
//             </div>
//           </div>

//           {/* Data Section */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
//             <div className="bg-gray-50 p-3 rounded-lg">
//               <p className="text-xs text-gray-500">CR (mpy)</p>
//               <p className="text-lg font-semibold">{item.cr_mpy}</p>
//             </div>

//             <div className="bg-gray-50 p-3 rounded-lg">
//               <p className="text-xs text-gray-500">Base CR (mpy)</p>
//               <p className="text-lg font-semibold">{item.cr_base_mpy}</p>
//             </div>

//             {item.total_inhibition_percent !== undefined && (
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-xs text-gray-500">Inhibition %</p>
//                 <p className="text-lg font-semibold">
//                   {item.total_inhibition_percent}%
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CorrosionResults;
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CorrosionDetails = () => {
  const router = useRouter;
  const data = useSelector((state: RootState) => state.analysisLab.corrsion);
  console.log(data);

  if (!data) {
    return (
      <div className="text-center py-10 text-gray-500">No data available</div>
    );
  }

  const { metal_type, cr_mpy, cr_base_mpy, rating, total_inhibition_percent } =
    data;

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Corrosion Prediction Result
        </h1>
        <div className="flex items-center justify-between gap-3">
          <Link
            href={"/dashboard/analysisLab/corrosion-rate"}
            className="inline-flex items-center justify-center py-2 px-4  rounded-xl border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" /> Back
          </Link>
        </div>
      </div>
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-5 border">
        <h2 className="text-xl font-semibold capitalize">
          {metal_type?.replace("_", " ")}
        </h2>
      </div>

      {/* Corrosion Details */}
      <div className="bg-white shadow rounded-xl p-5 border">
        <h3 className="text-lg font-semibold mb-4">Corrosion Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-500">CR MPY</p>
            <p className="text-lg font-semibold">
              {cr_mpy || data?.corrosion_prediction?.cr_mpy || "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Base CR MPY</p>
            <p className="text-lg font-semibold">
              {cr_base_mpy || data?.corrosion_prediction?.cr_base_mpy || "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Total nhibition percent</p>
            <p className="text-lg font-semibold">
              {total_inhibition_percent ||
                data?.corrosion_prediction?.total_inhibition_percent ||
                "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Rating</p>
            <p className="text-lg font-semibold">
              {rating || data?.corrosion_prediction?.rating || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrosionDetails;
