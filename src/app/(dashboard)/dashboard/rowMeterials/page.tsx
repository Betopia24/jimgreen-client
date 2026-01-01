import PageHeader from '@/components/dashboard/PageHeader'
import RowMeterialsTable from '@/components/dashboard/rowMeterials/rowMeterialsTable'
import Link from 'next/link'
import React from 'react'
import { GoPlus } from 'react-icons/go'

function RowMeterials() {
    return (
        <div>
            {/* header section  */}
            <div className='lg:flex items-center justify-between'>
                <PageHeader title='Raw Materials Management' description='View and manage all raw materials and treatment chemicals used in your water systems.' />
                <Link href="/dashboard/rowMeterials/addRowMeterials">
                    <button
                        type="submit"
                        className="lg:px-4 lg:py-3 px-3 py-2 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                        <GoPlus size={20} className='text-white' />
                        <span>Add Raw Materials </span>
                    </button>
                </Link>
            </div>
            {/* row meterials table  */}
            <RowMeterialsTable />
        </div>
    )
}

export default RowMeterials