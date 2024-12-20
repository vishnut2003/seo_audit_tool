'use client';

import { RiLogoutBoxRLine } from '@remixicon/react'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = ({iconType, className}: {
    iconType: boolean,
    className: string
}) => {
    return (
        <button 
        onClick={() => signOut()}
        className={className}>
            { iconType && <RiLogoutBoxRLine size={24} /> }
            <p>Logout</p>
        </button>
    )
}

export default LogoutButton