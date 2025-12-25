'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface AlertItem {
  id: string;
  element: string;
  symbol: string;
  status: 'critical';
  description: string;
  sample: string;
  timeAgo: string;
}

const alerts: AlertItem[] = [
  {
    id: '1',
    element: 'Copper',
    symbol: 'Cu',
    status: 'critical',
    description: 'Copper levels approaching EPA action level',
    sample: 'Sample: WA-2024-1247',
    timeAgo: '2 hours ago',
  },
  {
    id: '2',
    element: 'Lead',
    symbol: 'Pb',
    status: 'critical',
    description: 'Lead detection near action level',
    sample: 'Sample: WA-2024-1246',
    timeAgo: '5 hours ago',
  },
];

export default function InputParametersCard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="pb-6">
      <div className="bg-white rounded-lg p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-headingColor">
            Input Parameters
          </h2>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-gray-600 transition-transform duration-300 cursor-pointer"
          >
            <IoIosArrowUp
              className={`transition-transform duration-300 ${!isOpen ? "rotate-180" : ""
                }`}
              size={22}
            />
          </button>
        </div>

        {/* Smooth Collapsible Section */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen
            ? "max-h-[1000px] opacity-100 translate-y-0 pt-6"
            : "max-h-0 opacity-0 -translate-y-2"
            }`}
        >
          <div className="space-y-6">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-[#F3F3F3] rounded-lg p-6 flex items-start gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="bg-[#FB2C361A] rounded-lg p-3">
                    <AlertTriangle className="w-8 h-8 text-[#FF3366]" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-medium text-[#000000]">
                      {alert.element} ({alert.symbol})
                    </h3>
                    <span className="bg-[#FB2C361A] text-[#FF6467] px-3 py-1 rounded-sm text-sm">
                      critical
                    </span>
                  </div>

                  <p className="text-[#FF6467] text-sm mb-2">{alert.description}</p>

                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{alert.sample}</p>
                    <p>• {alert.timeAgo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>


  );
}
