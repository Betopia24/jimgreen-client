// 'use client';

// import React, { useState } from 'react';
// import { AlertTriangle } from 'lucide-react';
// import { IoIosArrowUp } from 'react-icons/io';

// interface AlertItem {
//   id: string;
//   element: string;
//   symbol: string;
//   status: 'critical';
//   description: string;
//   sample: string;
//   timeAgo: string;
// }

// const alerts: AlertItem[] = [
//   {
//     id: '1',
//     element: 'Copper',
//     symbol: 'Cu',
//     status: 'critical',
//     description: 'Copper levels approaching EPA action level',
//     sample: 'Sample: WA-2024-1247',
//     timeAgo: '2 hours ago',
//   },
//   {
//     id: '2',
//     element: 'Lead',
//     symbol: 'Pb',
//     status: 'critical',
//     description: 'Lead detection near action level',
//     sample: 'Sample: WA-2024-1246',
//     timeAgo: '5 hours ago',
//   },
// ];

// export default function InputParametersCard() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="pb-6">
//       <div className="bg-white rounded-lg p-6">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-semibold text-headingColor">
//             Input Parameters
//           </h2>

//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-gray-600 transition-transform duration-300 cursor-pointer"
//           >
//             <IoIosArrowUp
//               className={`transition-transform duration-300 ${!isOpen ? "rotate-180" : ""
//                 }`}
//               size={22}
//             />
//           </button>
//         </div>

//         {/* Smooth Collapsible Section */}
//         <div
//           className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen
//             ? "max-h-[1000px] opacity-100 translate-y-0 pt-6"
//             : "max-h-0 opacity-0 -translate-y-2"
//             }`}
//         >
//           <div className="space-y-6">
//             {alerts.map((alert) => (
//               <div
//                 key={alert.id}
//                 className="bg-[#F3F3F3] rounded-lg p-6 flex items-start gap-4"
//               >
//                 <div className="flex-shrink-0">
//                   <div className="bg-[#FB2C361A] rounded-lg p-3">
//                     <AlertTriangle className="w-8 h-8 text-[#FF3366]" />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-6">
//                     <h3 className="text-xl font-medium text-[#000000]">
//                       {alert.element} ({alert.symbol})
//                     </h3>
//                     <span className="bg-[#FB2C361A] text-[#FF6467] px-3 py-1 rounded-sm text-sm">
//                       critical
//                     </span>
//                   </div>

//                   <p className="text-[#FF6467] text-sm mb-2">{alert.description}</p>

//                   <div className="text-sm text-[#666666] flex items-center gap-4">
//                     <p>{alert.sample}</p>
//                     <p>• {alert.timeAgo}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>


//   );
// }



"use client"
import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { IoIosArrowUp } from 'react-icons/io';

// Define the shape of an alert
type Alert = {
  id: string | number;
  element: string;
  symbol: string;
  status: 'critical' | 'warning' | 'good';
  description: string;
  sample: string;
  timeAgo: string;
};

// Props for the component
type InputParametersCardProps = {
  inputParams?: Alert[];
  title?: string;
  defaultOpen?: boolean;
};

export default function InputParametersCard({
  inputParams,
  title,
  defaultOpen = false,
}: InputParametersCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // If no alerts, return null
  if (!inputParams || inputParams.length === 0) {
    return null;
  }

  // Variant styles based on status
  const getVariantStyle = (status: Alert['status']) => {
    switch (status) {
      case 'critical':
        return {
          iconBg: 'bg-[#FB2C361A]',
          iconColor: 'text-[#FF3366]',
          badgeBg: 'bg-[#FB2C361A]',
          badgeText: 'text-[#FF6467]',
          descText: 'text-[#FF6467]',
          Icon: AlertTriangle,
        };
      case 'warning':
        return {
          iconBg: 'bg-[#F0B1001A]',
          iconColor: 'text-[#FFB800]',
          badgeBg: 'bg-[#FFB8001A]',
          badgeText: 'text-[#FFB800]',
          descText: 'text-[#FFB800]',
          Icon: AlertCircle,
        };
      case 'good':
        return {
          iconBg: 'bg-[#00C9501A]',
          iconColor: 'text-[#00FF88]',
          badgeBg: 'bg-[#009D341A]',
          badgeText: 'text-[#009D34]',
          descText: 'text-[#009D34]',
          Icon: CheckCircle,
        };
      default:
        return {
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-700',
          descText: 'text-gray-700',
          Icon: AlertCircle,
        };
    }
  };

  return (
    <div className="pb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-headingColor">
            {title}
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-gray-600 transition-transform duration-300 cursor-pointer"
          >
            <IoIosArrowUp
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              size={22}
            />
          </button>
        </div>

        {/* Collapsible Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen
              ? 'max-h-[2000px] opacity-100 pt-6'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-6">
            {inputParams.map((alert) => {
              const style = getVariantStyle(alert.status);
              const IconComponent = style.Icon;

              return (
                <div
                  key={alert.id}
                  className="bg-gray-50 rounded-lg p-6 flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className={`${style.iconBg} rounded-lg p-3`}>
                      <IconComponent className={`w-8 h-8 ${style.iconColor}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-xl font-medium text-gray-900">
                        {alert.element} {alert.symbol && `(${alert.symbol})`}
                      </h3>
                      <span className={`${style.badgeBg} ${style.badgeText} px-3 py-1 rounded-sm text-sm font-medium capitalize`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className={`${style.descText} text-sm mb-2`}>
                      {alert.description}
                    </p>
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <p>{alert.sample}</p>
                      <p>• {alert.timeAgo}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}