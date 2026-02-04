"use client";

import PageHeader from '@/components/dashboard/PageHeader';
import { useForm, Controller } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useGetSingleCustomerQuery, useGetUpdateCustomerMutation } from '@/redux/api/customer/customerApi';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { LuLoader } from 'react-icons/lu';
import { toast } from 'sonner';

interface CustomerFormData {
    customerName?: string;
    siteName?: string;
    location?: string;
    address?: string;
    contactPerson?: string;
    contactEmail?: string;
    contactPhone?: string;
}

export default function EditCustomer() {
    const { customerId } = useParams<{ customerId?: string }>();
    const { data: singleCustomer, error } = useGetSingleCustomerQuery(customerId || "");
    const [updateCustomer, {isLoading}] = useGetUpdateCustomerMutation();

    const { register, handleSubmit, setValue, control } = useForm<CustomerFormData>({
        defaultValues: {
            customerName: '',
            siteName: '',
            location: '',
            address: '',
            contactPerson: '',
            contactEmail: '',
            contactPhone: '',
        },
    });

    // Populate the form with customer data once it's fetched
    useEffect(() => {
        if (singleCustomer?.data) {
            // Dynamically set form values using `setValue`
            setValue("customerName", singleCustomer.data.name || "");
            setValue("siteName", singleCustomer.data.siteName || "");
            setValue("location", singleCustomer.data.location || "");
            setValue("address", singleCustomer.data.address || "");
            setValue("contactPerson", singleCustomer.data.contactPerson || "");
            setValue("contactEmail", singleCustomer.data.contactEmail || "");
            setValue("contactPhone", singleCustomer.data.contactPhone || "");
        }
    }, [singleCustomer, setValue]);

    const onSubmit = async (data: CustomerFormData) => {
        console.log('Customer Form Data:', data);

        const updatedCustomer = {
            name: data?.customerName,
            siteName: data?.siteName,
            location: data?.location,
            address: data?.address,
            contactPerson: data?.contactPerson,
            contactEmail: data?.contactEmail,
            contactPhone: data?.contactPhone,
        };

        try {
            const response = await updateCustomer({ customerId, updatedCustomer }).unwrap();
            if(response?.success === true){
                toast.success("Customer has been updated successfully.")
            }
        } catch (err) {
            console.error('Failed to update customer:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div>
                <PageHeader title='Edit Customer' description='Enter customer and site information' />
            </div>

            <div className="">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-xl hover:shadow-sm border border-[#E5E7EB] p-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Customer Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                {...register("customerName")}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Site Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Site Name
                            </label>
                            <Controller
                                name="siteName"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] bg-[#F3F3F3]">
                                            <SelectValue placeholder={singleCustomer?.data?.siteName || "Select Site"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="site1">Site 1</SelectItem>
                                            <SelectItem value="site2">Site 2</SelectItem>
                                            <SelectItem value="site3">Site 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                {...register("location")}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                {...register("address")}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Contact Person */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Person
                            </label>
                            <input
                                type="text"
                                {...register("contactPerson")}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Contact Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                {...register("contactEmail")}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Contact Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                {...register("contactPhone")}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] bg-[#F3F3F3]"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-10">
                        <button
                            className="px-6 py-3 bg-[#004AAD] text-white font-medium rounded-lg hover:bg-[#004AAD] transition-colors text-sm cursor-pointer flex items-center gap-2"
                        >
                            {isLoading && (
                                <>
                                    <LuLoader
                                        className={` animate-spin text-center absolutem text-white`}
                                    />
                                </>
                            )}
                            Save Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
