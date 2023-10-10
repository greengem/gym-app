import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { fetchRoutines } from "@/utils/FetchRoutines";

import PageHeading from "../components/PageHeading";
import RoutineList from './RoutineList';

import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";

import { IconPlus } from "@tabler/icons-react";

export default async function RoutinesPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const routines = await fetchRoutines(session.user.id);

  return (
      <>
          <PageHeading title="Routines" />
          <Link as={NextLink} href="/routines/new" className="mb-5">
            <Button color="primary" className="gap-unit-1">
              <IconPlus size={16} />Create New Routine
            </Button>
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-5">
            <RoutineList routines={routines} />
          </div>
      </>
  );
}

