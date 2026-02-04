"use client";

import React, { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import {
  useAllRowMaterialsQuery,
  useDeleteRowMaterialsMutation,
} from "@/redux/api/rowMaterials/rowMaterialsSliceApi";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import LoadingPage from "@/components/shared/loading/LoadingPage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import moment from "moment";
import DeleteConfirmModal from "@/components/shared/DeteleConfirm/DeleteConfirm";

// Company type
export interface Company {
  id: string;
  name: string;
  email: string;
  location: string;
}

// Chemical type
export interface Material {
  id: string;
  chemicalName: string;
  chemicalType: "Biocide" | string;
  supplierName: string;
  dosageRate: string;
  feedFrequency: "Daily" | "Weekly" | "Monthly" | string;
  safetyClassification: "Hazardous" | "Non-Hazardous" | string;
  instructions: string;
  isActive: boolean;
  dosageType?: string;
  companyId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  company: Company;
}

export default function RowMeterialsTable() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  const { data, isLoading: profielLoading } = useGetMeProfileQuery("");
  const [deleteRowMaterials, { isLoading: loading }] =
    useDeleteRowMaterialsMutation();

  const id =
    data?.data?.companyMember?.companyId || user?.companyMember?.companyId;
  const { data: allData, isLoading } = useAllRowMaterialsQuery(id);
  console.log(allData);
  const materials = allData?.data as Material[];

  const handleDelete = async () => {
    console.log(selectedItem);
    try {
      const response = await deleteRowMaterials(selectedItem).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (profielLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="bg-gray-50 py-6">
        <div className="bg-white rounded-lg hover:shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-[#2D2D2D]">
                Raw Materials List
              </h2>

              <div className="relative w-50 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm placeholder:text-[#636F85] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto border border-[#E2E8F0] border-b-0 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F3F4F6] border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                      Supplier
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                      Dosage Rate
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                      Feed Frequency
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                      Last Modified
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {materials?.map((material: Material) => (
                    <tr
                      key={material.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-[#2D2D2D] text-sm font-medium">
                        {material.chemicalName}
                      </td>
                      <td className="py-4 px-6 text-[#636F85] text-sm">
                        {material.supplierName}
                      </td>
                      <td className="py-4 px-6 text-[#191919] text-sm">
                        {material.dosageRate}
                      </td>
                      <td className="py-4 px-6 text-[#636F85] text-sm">
                        {material.feedFrequency}
                      </td>
                      <td className="py-4 px-6 text-[#4A5565] text-sm">
                        {moment(material.updatedAt).format("ll")}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center cursor-pointer px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              material.isActive
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                            }
                            `}
                        >
                          {material.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Link href={`/dashboard/rowMeterials/${material.id}`}>
                            <button className="text-[#0058DD] hover:text-[#0058DD] transition-colors cursor-pointer mt-2">
                              <FiEdit className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedItem(material.id);
                              setIsDeleteOpen(true);
                            }}
                            className="text-[#E7000B] hover:text-[#E7000B] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Raw Materials"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        isLoading={loading}
      />
    </>
  );
}
