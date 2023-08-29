import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'



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
        <div className='flex flex-col gap-4 w-max'>
            {[1, 2, 3].map((_, index) => (
                <div className='border border-border rounded-lg w-full p-4 flex justify-between gap-10'>

                    <div className='flex gap-6'>
                        <DataContainer key={index} label="Appointment Ref." value="1234" />
                        <DataContainer key={index} label="Name" value="Juan Dela Cruz" />
                        <DataContainer key={index} label="Address" value="Manila, Philippines" />
                        <DataContainer key={index} label="Contact Number" value="+63 999 2232 232" />
                        <DataContainer key={index} label="Status" value="confirmed" />
                    </div>

                    <div className='flex gap-2'>
                        <Button size="sm" variant="destructive">Delete</Button>
                        <Button size="sm">View</Button>
                        <Button size="sm" variant="outline">Copy ID</Button>

                    </div>

                </div>
            ))}
        </div>
    )
}

export default Appointments