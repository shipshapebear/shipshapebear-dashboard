import React from 'react'
import Spinner from '@/components/ui/spinner'

const LoadingPage = () => {
    return (
        <div className='fixed inset-0 inline-flex h-screen w-screen items-center justify-center'>
            <Spinner />
        </div>
    )
}

export default LoadingPage