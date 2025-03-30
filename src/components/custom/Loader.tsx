'use client'

import React from 'react'
import  Image  from 'next/image'

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Image src="/Ekoech.png" alt="Loading..." width={200} height={200} />
        </div>
    )
}

export default Loader