import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import PageHeading from "../../components/PageHeading";
import NewRoutineTable from "./NewRoutineTable";
import NewRoutineModal from "./NewRoutineModal";

import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default async function NewRoutinePage() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    return (
        <>
            <PageHeading title="New Routine" />
            <Input isRequired type="text" label="Routine Name" placeholder="Enter a name for your Routine" className="mb-2" />
            <Textarea labelPlacement="inside" label="Notes" placeholder="(Optional) Add some notes to your routine" className="mb-2" />
            <NewRoutineModal />
            <NewRoutineTable />
            <Button color="danger">Save</Button>
        </>
    );
}
