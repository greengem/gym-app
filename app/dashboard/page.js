import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import PageHeading from "../components/PageHeading";
import UserDetail from "./UserDetail";

export default async function DashboardPage() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <PageHeading title="Dashboard" />
            <UserDetail />
        </>
    );
}