import PageHeader from '@/components/dashboard/PageHeader'
import ProductRowMeterialTable from '@/components/dashboard/product/productRowMeterialTable'
import React from 'react'
import { GoPlus } from 'react-icons/go'

function Product() {
    return (
        <div>
            {/* header section  */}
            <div className='flex items-center justify-between'>
                <PageHeader title='Raw Materials Management' description='View and manage all raw materials and treatment chemicals used in your water systems.' />
                <button
                    type="submit"
                    className="px-4 py-3 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                    <GoPlus size={20} className='text-white' />
                    <span>Add Product</span>
                </button>
            </div>
            {/* product row meteria table  */}
            <ProductRowMeterialTable/>
        </div>
    )
}

export default Product