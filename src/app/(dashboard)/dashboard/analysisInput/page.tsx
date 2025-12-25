import FileUpload from '@/components/dashboard/analysisInput/fileUpload'
import PageHeader from '@/components/dashboard/PageHeader'
import React from 'react'

function AnalysisInput() {
    return (
        <div>
            <PageHeader
                title="Water Chemistry Analysis Input"
                description="Enter raw water chemistry values for comprehensive analysis"
            />
            <FileUpload/>
        </div>
    )
}

export default AnalysisInput