// Tengo que aprenderme bien las estructuras basicas de Next
// Tambien lo de typescript, el tipado y todo

import React from 'react'

type Props = { children: React.ReactNode }

export default function Layout({children}: Props) {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            {children}
        </div>
    )
}

