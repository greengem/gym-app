import { getServerSession } from 'next-auth'
import Link from "next/link";

import PageHeading from "./components/PageHeading";

export default async function Home() {
  const session = await getServerSession();
  
  return (
    <>
      <PageHeading title="Landing Page" />
      {session?.user?.name ? (
        <div>
          <Link href="/dashboard">Go to Dashboard {session?.user?.name}</Link>
        </div>
      ) : (
        <div><Link href="/api/auth/signin">Log in</Link></div>
      )}
    </>
  );
}
