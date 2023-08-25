"use client"
import React, { useEffect, useState } from 'react'

const TimeSection = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every 1000ms (1 second)

        return () => {
            clearInterval(intervalId); // Clear interval on component unmount
        };
    }, []);

    const formattedDate = new Intl.DateTimeFormat('en-PH', { dateStyle: 'long' }).format(currentTime)
    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });


    return (
        <div className='col-span-4 border border-border rounded-lg p-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-xl font-bold'>{formattedTime}</p>
                    <p>{formattedDate}</p>
                </div>
                <p className='font-bold text-2xl'>{formattedDay}</p>
            </div>
        </div>
    )
}

export default TimeSection