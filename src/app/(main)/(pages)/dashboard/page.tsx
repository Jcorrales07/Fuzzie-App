import React from 'react'
import {currentUser} from "@clerk/nextjs/server";

type Props = {}

const DashboardPage = async () => {
    const user = await currentUser()

    return (
        <div className='flex flex-col gap-4 relative'>
            <h1 className='text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b'>
                Dashboard, Welcome back {user?.firstName}!
            </h1>
        </div>
    )
}

export default DashboardPage