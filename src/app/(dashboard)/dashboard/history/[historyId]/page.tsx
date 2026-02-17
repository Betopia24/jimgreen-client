"use client"
import MainReportsDetails from '@/components/dashboard/history/repotsDetails/MainReportsDetails'
import { useParams } from 'next/navigation';
import React from 'react'

function HistoryDetails() {
  const { historyId } = useParams();
  return (
    <div className='my-6'>
      <MainReportsDetails historyId={historyId as string} />
    </div>
  )
}

export default HistoryDetails