import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, Eye, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Pagination from '@/components/ui/pagination'



const DataContainer = ({ label, value }: any) => {
    return (
        <div className='flex flex-col text-center gap-1'>
            {label !== "Status" ? <strong>
                {value}
            </strong> :
                <Badge variant="confirmed" className='capitalize'>
                    {value}
                </Badge>
            }
            <span className='text-xs'>
                {label}
            </span>
        </div>)
}
const Appointments = () => {
    return (
        <div className='flex flex-col gap-4 w-max items-center'>
            {[1, 2, 3].map((_, index) => (
                <div className='border border-border rounded-lg w-full p-4 flex justify-between gap-10'>

                    <div className='flex gap-6'>
                        <DataContainer key={index} label="Appointment Ref." value="1234" />
                        <DataContainer key={index} label="Name" value="Juan Dela Cruz" />
                        <DataContainer key={index} label="Address" value="Manila, Philippines" />
                        <DataContainer key={index} label="Contact Number" value="+63 999 2232 232" />
                        <DataContainer key={index} label="Status" value="confirmed" />
                    </div>

                    <TooltipProvider disableHoverableContent delayDuration={300} >
                        <div className='flex gap-2'>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline"><Trash2 /></Button>
                                </TooltipTrigger>
                                <TooltipContent side='top'>
                                    Delete
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline"><Eye /></Button>
                                </TooltipTrigger>
                                <TooltipContent side='top'>
                                    View Details
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline"><Copy /></Button>
                                </TooltipTrigger>
                                <TooltipContent side='top'>
                                    Copy
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
            ))}

            <Pagination />
        </div>
    )
}

export default Appointments