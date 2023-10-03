"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

function AuthButton() {
    const {data: session } = useSession();

    if (session) {
        return <Button onClick={() => signOut()}>Sign out</Button>;
    }
    return <Button onClick={() => signIn()}>Sign in</Button>
}

export default function NavMenu() {
    const pathname = usePathname();
    
    return (
        <Navbar maxWidth="full" className="mb-10">
          <NavbarBrand><p className="font-bold text-inherit">GYM APP</p></NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem><Link as={NextLink} href="/">Home</Link></NavbarItem>
            <NavbarItem><Link as={NextLink} href="/dashboard">Dashboard</Link></NavbarItem>
            <NavbarItem><Link as={NextLink} href="/exercises">Exercises</Link></NavbarItem>
            <NavbarItem><Link as={NextLink} href="/routines">Routines</Link></NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <AuthButton />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
    );
}
