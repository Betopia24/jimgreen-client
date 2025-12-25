import PageHeader from '@/components/dashboard/PageHeader'
import { GoArrowRight } from "react-icons/go";

function Comparison() {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <PageHeader
                    title="Chemical Analysis Graphs"
                    description="Interactive visualization of water quality parameters"
                />
                <button
                    type="submit"
                    className="px-4 py-3 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                    <span>Recalculation </span>
                    <GoArrowRight size={20} className='text-white' />
                </button>
            </div>
        </div>
    )
}

export default Comparison