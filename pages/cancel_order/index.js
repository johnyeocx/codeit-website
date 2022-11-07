import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function CancelOrder() {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }, [])
    return (
        <div style={{
            width: '100vw',
            height: '100vh'
        }}>
            <h1>Making HTTP Request</h1>
        </div>
    )
}

export default CancelOrder