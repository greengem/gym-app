import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import PageHeading from "../components/PageHeading";

export default async function Dashboard() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <PageHeading title="Routines" />
        </>
    );
}