import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggler } from '@/components/ThemeToggler'

function Header() {
    return (
        <header className='flex justify-between items-center  text-sm'>
            <Link href='/' className='flex items-center space-x-2'>
                <div className='bg-[#0160FE] w-fit'>
                    <Image
                        src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
                        alt="Dropbox Icon"
                        className='invert'
                        width={50}
                        height={50}
                    />

                </div>
                <h1 className='font-bold text-xl'>Drop Box</h1>
            </Link>
            <div className='flex items-center space-x-2 px-5'>
                <ThemeToggler />
                {/* Theme Toggler */}
                <UserButton afterSignOutUrl='/' />
                {/* User Avatar */}
                <SignedOut >
                    <SignInButton afterSignInUrl='/dashboard' mode='modal' />
                </SignedOut>
            </div>
        </header>
    )
}

export default Header