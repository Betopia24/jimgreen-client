"use client";

import React, { useState } from "react";
import { Search, Trash2, Eye } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import { User } from "@/app/(dashboard)/dashboard/rowMeterials/addRowMeterials/page";
import {
  useGetCustomerQuery,
  useGetDeleteCustomerMutation,
} from "@/redux/api/customer/customerApi";
import LoadingPage from "@/components/shared/loading/LoadingPage2";
import { toast } from "sonner";
import DeleteConfirmModal from "@/components/shared/DeteleConfirm/DeleteConfirm";
import { useDispatch } from "react-redux";
import { setCustomerId } from "@/redux/features/customer/customerSlice";

export default function CustomerTable() {
  const dispatch = useDispatch();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: userData } = useGetMeProfileQuery("");
  const profile = userData?.data as User;

  const companyId = profile?.companyMember?.companyId;
  const {
    data: customerResponse,
    isLoading,
    isError,
  } = useGetCustomerQuery(companyId, {
    skip: !companyId,
  });

  const [deleteCustomer, { isLoading: loading }] =
    useGetDeleteCustomerMutation();

  const customers = customerResponse?.data || [];

  const filteredCustomers = customers.filter(
    (customer: any) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.siteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async () => {
    try {
      const response = await deleteCustomer(selectedItem).unwrap();
    } catch (err: any) {
      console.error("Failed to update customer:", err);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="py-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-between">
            <h2 className="text-xl font-semibold text-[#2D2D2D]">
              Customers List
            </h2>
            {/* <div className="relative w-50 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-[#636F85] focus:outline-nonew-64"
                            />
                        </div> */}
          </div>

          <div className="overflow-x-auto border border-[#E2E8F0] rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F3F4F6] border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                    Customer Name
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                    Site
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                    Location
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                    Address
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                    Assets
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers?.length > 0 ? (
                  filteredCustomers?.map((material: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-[#2D2D2D] text-sm font-medium">
                        {material.name}
                      </td>
                      <td className="py-4 px-6 text-[#636F85] text-sm">
                        {material.siteName}
                      </td>
                      <td className="py-4 px-6 text-[#191919] text-sm">
                        {material.location}
                      </td>
                      <td className="py-4 px-6 text-[#636F85] text-sm">
                        {material.address}
                      </td>
                      <td className="py-4 px-6 text-[#4A5565] text-sm">
                        {material?.assets?.length}
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
                          <Link href={`/dashboard/customers/${material.id}`}>
                            <button className="text-[#34A853] hover:text-[#2d8e44] transition-colors mt-2 cursor-pointer">
                              <FiEdit className="w-4 h-4" />
                            </button>
                          </Link>
                          <Link href={`/dashboard/customers/showCustomer`}>
                            <button
                              className="text-[#0058DD] hover:text-[#0058DD] transition-colors mt-2 cursor-pointer"
                              onClick={() =>
                                dispatch(setCustomerId(material?.id))
                              }
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedItem(material?.id);
                              setIsDeleteOpen(true);
                            }}
                            className="text-[#E7000B] hover:text-[#E7000B] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-8 px-6 text-center text-gray-500 text-sm">
                      No materials found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Customer"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        isLoading={loading}
      />
    </div>
  );
}
