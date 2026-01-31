
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
import { useGetMeProfileQuery } from '@/redux/api/getMe/getMeApi';
import { useAddCustomerMutation } from '@/redux/api/customer/customerApi';
import { User } from '../../rowMeterials/addRowMeterials/page';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LuLoader } from 'react-icons/lu';

interface CustomerFormData {
    customerName: string;
    siteName: string;
    location: string;
    address: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
}

export default function AddCustomer() {
    const rotuer = useRouter();
    const { data: userData } = useGetMeProfileQuery("");
    const profile = userData?.data as User
    console.log(profile, "================")

    const [addCustomer, { isLoading, isError, data }] = useAddCustomerMutation();

    const { register, handleSubmit, control } = useForm<CustomerFormData>({
        defaultValues: {
            customerName: 'Enter ph',
            siteName: 'site1',
            location: 'Biocide',
            address: 'e.g., 4500 Industrial Blvd',
            contactPerson: 'Enter ph',
            contactEmail: 'xyz@gmail.com',
            contactPhone: '052126262',
        },
    });

    const onSubmit = async (data: CustomerFormData) => {
        const payload = {
            name: data.customerName,
            siteName: data.siteName,
            location: data.location,
            address: data.address,
            contactPerson: data.contactPerson,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            isActive: profile?.isEmailVerified,
            companyId: profile?.companyMember?.companyId
        }

        try {
            // call the mutation with payload
            const response = await addCustomer(payload).unwrap();
            if (response?.success === true) {
                toast.success("Create customer is successfully")
                rotuer.back();
            }
            // maybe show a success toast or navigate
        } catch (error) {
            console.error("Failed to create customer:", error);
        }

    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* header section  */}
            <div>
                <PageHeader title='Add Customer' description='Enter customer and site information' />
            </div>
            {/* edit section  */}
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
                                placeholder="Enter ph"
                                {...register("customerName")}
                                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm bg-[#F3F3F3]"
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <SelectTrigger className="w-full px-4 py-2.5 border rounded-lg bg-[#F3F3F3]">
                                            <SelectValue placeholder="Select type" />
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
                                className="w-full px-4 py-2.5 border rounded-lg bg-[#F3F3F3]"
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
                                className="w-full px-4 py-2.5 border rounded-lg bg-[#F3F3F3]"
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
                                className="w-full px-4 py-2.5 border rounded-lg bg-[#F3F3F3]"
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
                                className="w-full px-4 py-2.5 border rounded-lg bg-[#F3F3F3]"
                            />
                        </div>

                        {/* Contact Phone - Full width on lg */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                {...register("contactPhone")}
                                className="w-full px-4 py-2.5 border rounded-lg bg-[#F3F3F3]"
                            />
                        </div>
                    </div>


                    {/* Submit Button */}
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
                            Add Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}