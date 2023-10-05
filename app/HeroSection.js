"use client";
import { Button } from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";

const HeroSection = () => {
  return (
    <div className="text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-5">Gym-App</h1>
        <p className="text-xl text-center mb-5">Access over 800 exercises and create unlimited routines. Track your progress.</p>
        <Button size="lg" color="primary" onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>
            Sign in
        </Button>

    </div>
  );
}

export default HeroSection;
