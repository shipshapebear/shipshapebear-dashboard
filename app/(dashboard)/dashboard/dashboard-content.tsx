import React from 'react'
import TimeSection from './time-section'
import { AppointmentTable } from './appointment-table'
import { PendingAppointments } from './pending-appointments'

const DashboardContent = ({ data }: any) => {

    const pendingAppointments = {
        id: 1,

    }

    return (
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-8 border-border border p-4 rounded-lg'>
                <h1 className='text-2xl font-bold'>Good Day, {data?.displayName || data?.username}</h1>
                <p>Have a nice day!</p>
            </div>
            <TimeSection />

            <div className='col-span-8 border-border border p-4 rounded-lg h-max'>
                <h2>Appointments</h2>
                <AppointmentTable />
            </div>
            <div className='col-span-4 border border-border rounded-lg p-4 h-max'>
                <h2>Pending Appointments</h2>
                <PendingAppointments />
            </div>
        </div>
    )
}

export default DashboardContent