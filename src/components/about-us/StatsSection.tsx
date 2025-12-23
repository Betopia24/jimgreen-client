// "use client";

// import Container from "@/lib/Container";
// import React from "react";
// import { IoMdTime } from "react-icons/io";
// import StatsCard from "../ui/card/StatsCard";

// const statsData = [
//   { icon: IoMdTime, number: "10+", label: "Years of Operation" },
//   { icon: IoMdTime, number: "50+", label: "Projects Completed" },
//   { icon: IoMdTime, number: "100+", label: "Clients Served" },
//   { icon: IoMdTime, number: "100+", label: "Clients Served" },
// ];

// const StatsSection: React.FC = () => {
//   return (
//     <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28">
//       <Container>
//         <div
//           className="rounded-2xl flex flex-row justify-between items-center shadow-xl bg-cover bg-center h-[265px] p-6 px-[70px]"
//           style={{
//             backgroundImage: `url(${"/bg.png"})`,
//           }}
//         >
//           {statsData.map((stat, index) => (
//             <StatsCard
//               key={index}
//               icon={stat.icon}
//               number={stat.number}
//               label={stat.label}
//             />
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default StatsSection;


"use client";

import Container from "@/lib/Container";
import React from "react";
import { IoMdTime } from "react-icons/io";
import StatsCard from "../ui/card/StatsCard";

const statsData = [
  { icon: IoMdTime, number: "10+", label: "Years of Operation" },
  { icon: IoMdTime, number: "50+", label: "Projects Completed" },
  { icon: IoMdTime, number: "100+", label: "Clients Served" },
  { icon: IoMdTime, number: "100+", label: "Clients Served" },
];

const StatsSection: React.FC = () => {
  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28">
      <Container>
        <div
          className="
            rounded-2xl 
            flex flex-wrap 
            justify-center md:justify-between 
            items-center 
            gap-6 md:gap-4 
            shadow-xl 
            bg-cover bg-center 
            p-6 sm:p-10 md:px-[70px]
          "
          style={{
            backgroundImage: `url(${"/bg.png"})`,
          }}
        >
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default StatsSection;
