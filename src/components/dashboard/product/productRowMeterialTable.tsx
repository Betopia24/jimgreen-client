"use client";

import React, { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductsMutation,
} from "@/redux/api/productsManage/productSliceApi";
import LoadingPage from "@/components/shared/loading/LoadingPage2";
import DeleteConfirmModal from "@/components/shared/DeteleConfirm/DeleteConfirm";

export type CommunityVisibility = "Technical Users" | "Public" | "Private";

export interface RawMaterialSnapshot {
  rawId: string;
  percentage: number;
  nameSnapshot: string;
  costSnapshot: number;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  productName: string;
  manufacturerName: string;
  rawMaterials: RawMaterialSnapshot[];
  waterPercentage: number;
  calculatedProductCost: number;
  manualCostOverride: number;
  finalProductCost: number;
  productPrice: number;
  communityVisibility: string; // You can make this union type if fixed values
  isActive: boolean;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  company: Company;
}

export default function ProductRowMeterialTable() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user.user);

  const { data, isLoading: profielLoading } = useGetMeProfileQuery("");
  const [deleteProduct, { isLoading: loading }] = useDeleteProductMutation();

  const id = data?.data?.companyMember?.company.id || "";
  const { data: allData, isLoading } = useAllProductsQuery(id);
  console.log(allData);
  const products = allData?.data as Product[];

  // delete function
  const handleDelete = async () => {
    console.log(selectedItem);
    try {
      const response = await deleteProduct(selectedItem).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (profielLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gray-50 py-6">
      <div className="bg-white rounded-lg hover:shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-between">
            <h2 className="text-xl font-semibold text-[#2D2D2D]">
              Product List
            </h2>
            <div className="relative w-50 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-[#636F85] focus:outline-nonew-64"
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
                    manufacturer
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                    Community Visibility
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                    Product Price
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                    Water Percentage
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
                {products?.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-[#2D2D2D] text-sm font-medium">
                      {product.productName}
                    </td>
                    <td className="py-4 px-6 text-[#636F85] text-sm">
                      {product.manufacturerName}
                    </td>
                    <td className="py-4 px-6 text-[#191919] text-sm">
                      {product.communityVisibility}
                    </td>
                    <td className="py-4 px-6 text-[#636F85] text-sm">
                      {product.productPrice}$
                    </td>
                    <td className="py-4 px-6 text-[#4A5565] text-sm">
                      {product.waterPercentage} %
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center cursor-pointer px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              product.isActive
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                            }
                            `}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Link href={`/dashboard/product/${product.id}`}>
                          <button className="text-[#0058DD] hover:text-[#0058DD] transition-colors cursor-pointer mt-2">
                            <FiEdit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedItem(product.id);
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
    </div>
  );
}
