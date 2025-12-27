
import ComparisonChart from '@/components/dashboard/analysisInput/comparisonChart';
import InputParametersCard from '@/components/dashboard/analysisInput/inputParametersCard';
import PageHeader from '@/components/dashboard/PageHeader'
import Link from 'next/link';
import { GoArrowRight } from "react-icons/go";

function Comparison() {

    const inputParams = [
        {
            id: '1',
            element: 'Copper',
            symbol: 'Cu',
            status: 'critical' as const,
            description: 'Copper levels approaching EPA action level',
            sample: 'Sample: WA-2024-1247',
            timeAgo: '2 hours ago',
        },
        {
            id: '2',
            element: 'Lead',
            symbol: 'Pb',
            status: 'critical' as const,
            description: 'Lead detection near action level',
            sample: 'Sample: WA-2024-1246',
            timeAgo: '5 hours ago',
        },
    ];

    const solutionParams = [
        {
            id: '3',
            element: 'Total Dissolved Solids',
            symbol: '',
            status: 'warning' as const,
            description: 'Copper levels approaching EPA action level',
            sample: 'Sample: WA-2024-1247',
            timeAgo: '21 hours ago',
        },
        {
            id: '4',
            element: 'Iron',
            symbol: 'Fe',
            status: 'warning' as const,
            description: 'Iron exceeds aesthetic standard',
            sample: 'Sample: WA-2024-1247',
            timeAgo: '21 hours ago',
        },
    ];

    const saturationIndices = [
        {
            id: '5',
            element: 'pH Level',
            symbol: '',
            status: 'good' as const,
            description: 'Copper levels approaching EPA action level',
            sample: 'Sample: WA-2024-1247',
            timeAgo: '2 hours ago',
        },
        {
            id: '6',
            element: 'Chlorine Residual',
            symbol: '',
            status: 'good' as const,
            description: 'Copper levels approaching EPA action level',
            sample: 'Sample: WA-2024-1247',
            timeAgo: '21 hours ago',
        },
    ];

    return (
        <div>
            {/* heading part  */}
            <div className='flex items-center justify-between'>
                <PageHeader
                    title="Chemical Analysis Graphs"
                    description="Interactive visualization of water quality parameters"
                />
                <Link href="/dashboard/analysisInput/recalculation">
                    <button
                        type="submit"
                        className="px-4 py-3 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>Recalculation </span>
                        <GoArrowRight size={20} className='text-white' />
                    </button>
                </Link>
            </div>
            {/* rechart  */}
            <ComparisonChart />
            {/* input parameter cards  */}
            <InputParametersCard inputParams={inputParams} title="Input Parameters" defaultOpen={true} />
            <InputParametersCard inputParams={solutionParams} title='Solution Parameters' defaultOpen={false} />
            <InputParametersCard inputParams={saturationIndices} title='Saturation Indices' defaultOpen={false} />

        </div>
    )
}

export default Comparison