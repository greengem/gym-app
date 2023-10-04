import { getServerSession } from 'next-auth'

import {User} from "@nextui-org/user";

export default async function UserDetail(){
    const session = await getServerSession();
    console.log("Client-side Session:", session);
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
