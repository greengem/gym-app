"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import NextLink from "next/link";
import Image from 'next/image';
import { Button } from "@nextui-org/button";
import {Link} from "@nextui-org/react";
import { IconDashboard } from '@tabler/icons-react';

const HeroSection = () => {
    const { data: session } = useSession();
    return (
        <div className="relative text-white h-screen flex flex-col justify-center items-center bg-gradient-to-t from-gray-800 to-black">
            <h1 className='tracking-tight font-bold text-4xl md:text-5xl lg:text-8xl mb-10 z-20'>
                <span>Lift.</span>
                <span className="from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b">
                    Learn.
                </span>
                <span>Level Up</span>
            </h1>
            <p className="text-xl text-center mb-5 z-20">Access over 800 exercises and create unlimited routines. Track your progress.</p>
            {
                session ? (
                    <Link as={NextLink} href="/dashboard">
                        <Button size="lg" color="primary" variant="ghost" className="gap-unit-1 z-20">
                            <IconDashboard size={18} />Dashboard
                        </Button>
                    </Link>
                ) : (
                    <Button size="lg" color="primary" variant="ghost" onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })} className="z-20">
                        Sign in
                    </Button>
                )
            }
        </div>
    );
}


export default HeroSection;
