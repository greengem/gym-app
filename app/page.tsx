import { getServerSession } from 'next-auth'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession();
  
  return (
    <>
      getServerSession Result:
      {session?.user?.name ? (
        <div>{session?.user?.name}</div>

      ) : (
        <div>Not logged in</div>
      )}
    </>
  );
}
