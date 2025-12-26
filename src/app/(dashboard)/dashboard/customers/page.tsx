import CustomerTable from '@/components/dashboard/customers/customersTable'
import PageHeader from '@/components/dashboard/PageHeader'
import React from 'react'
import { GoPlus } from 'react-icons/go'

function Customers() {
    return (
        <div>
            {/* header section  */}
            <div className='flex items-center justify-between'>
                <PageHeader title='Customers' description='Manage all customers, sites, and their associated assets' />
                <button
                    type="submit"
                    className="px-4 py-3 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                    <GoPlus size={20} className='text-white' />
                    <span>Add Customer</span>
                </button>
            </div>
            {/* table section  */}
            <CustomerTable/>
        </div>
    )
}

export default Customers