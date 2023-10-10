import { useSession } from 'next-auth/react';
import { User } from "@nextui-org/user";
import { Divider } from '@nextui-org/divider';

export default function UserDetail() {
    const { data: session } = useSession();

    return (
        <>
        <User
            name={session?.user?.name}
            description={session?.user?.email}
            avatarProps={{
                src: session?.user?.image
            }}
            className='m-2 mb-5'
        />
        <Divider />
        </>
    );
}
