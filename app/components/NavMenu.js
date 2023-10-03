"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import NextLink from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import { Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";

function AuthButton() {
    const {data: session } = useSession();

    if (!session) {
      return <Button onClick={() => signIn()}>Sign in</Button>
    }    
}

function AvatarDropdown() {
  const {data: session } = useSession();

  if (session) {
      return (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={session?.user?.name}
              size="sm"
              src={session?.user?.image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">Dashboard</DropdownItem>
            <DropdownItem key="team_settings">Activity</DropdownItem>
            <DropdownItem key="analytics">Routines</DropdownItem>
            <DropdownItem key="system">Exercises</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
  }
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
          <NavbarContent as="div" justify="end">
            <AuthButton />
            <AvatarDropdown />
          </NavbarContent>
        </Navbar>
    );
}
