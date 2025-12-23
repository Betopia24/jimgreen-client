
import HelpFaq from '@/components/help/HelpFaq'
import HelpForm from '@/components/help/helpForm'
import React from 'react'

function Help() {
    return (
        <div>
            <div className='my-6'>
                <h3 className='text-2xl text-[#2D2D2D] font-semibold mb-2'>Support & Help Center</h3>
                <p className='text-[16px] text-[#636F85]'>We're here to assist you with your work. payments, and schedule issues.</p>
            </div>
            <HelpFaq/>
            <HelpForm/>
        </div>
    )
}

export default Help