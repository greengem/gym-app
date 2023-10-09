"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import {Link} from "@nextui-org/react";
import { IconDashboard } from '@tabler/icons-react';

const HeroSection = () => {
  const { data: session } = useSession();

  return (
    <div className="text-white h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-5">Gym-App</h1>
      <p className="text-xl text-center mb-5">Access over 800 exercises and create unlimited routines. Track your progress.</p>
      {
        session ? (
          <Link as={NextLink} href="/dashboard">
            <Button size="lg" color="primary" className="gap-unit-1">
              <IconDashboard size={18} />Dashboard
            </Button>
          </Link>
        ) : (
          <Button size="lg" color="primary" onClick={() => signIn()}>
            Sign in
          </Button>
        )
      }
    </div>
  );
}

export default HeroSection;
