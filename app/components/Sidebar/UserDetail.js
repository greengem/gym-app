"use client";
import { useSession } from 'next-auth/react';
import { User } from "@nextui-org/user";

export default function UserDetail() {
    const { data: session } = useSession();

    return (
        <User
            name={session?.user?.name}
            description={session?.user?.email}
            avatarProps={{
                src: session?.user?.image
            }}
        />
    );
}
