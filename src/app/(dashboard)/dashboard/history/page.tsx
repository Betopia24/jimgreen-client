import HistoryTable from '@/components/dashboard/history/historyTable'
import PageHeader from '@/components/dashboard/PageHeader'
import React from 'react'

function History() {
    return (
        <div>
            <div>
                {/* heading section  */}
                <PageHeader title='Analysis History' description='Browse and manage past water quality analyses' />
            </div>
            {/* history table */}
            <HistoryTable />
        </div>
    )
}

export default History