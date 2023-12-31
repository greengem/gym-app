"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import NextLink from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import { Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";

import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";

import { IconBarbell } from '@tabler/icons-react';

function AuthButton() {
    const {data: session } = useSession();

    if (!session) {
      return <Button color="primary" variant="flat" onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>Sign in</Button>
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
              color="primary"
              size="sm"
              name={session?.user?.name}
              src={session?.user?.image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="dashboard" as={NextLink} href="/dashboard">Dashboard</DropdownItem>
            <DropdownItem key="dashboard" as={NextLink} href="/activity">Activity</DropdownItem>
            <DropdownItem key="analytics" as={NextLink} href="/workout">Start Workout</DropdownItem>
            <DropdownItem key="analytics" as={NextLink} href="/routines">Routines</DropdownItem>
            <DropdownItem key="system" as={NextLink} href="/exercises">Exercises</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
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
        <Navbar maxWidth="full" className="block lg:hidden">
          <NavbarBrand>
              <Link color="primary" href="/" as={NextLink}>
                <IconBarbell className="mr-1" />
              </Link>
          </NavbarBrand>
          <NavbarContent as="div" justify="end">
            <ThemeSwitcher />
            <AuthButton />
            <AvatarDropdown />
          </NavbarContent>
        </Navbar>
    );
}
