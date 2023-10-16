import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import FormattedDate from '@/app/components/FormattedDate'
import PageHeading from "../components/PageHeading";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image"
import {Link} from "@nextui-org/link";
import NextLink from "next/link";

import { IconPlayerPlay } from '@tabler/icons-react';

async function fetchRoutines(userId) {
    return await prisma.workoutPlan.findMany({
      where: {
        userId: userId,
        },
        select: {
            id: true,
            name: true,
            notes: true,
            WorkoutPlanExercise: {
            select: {
                Exercise: {
                select: {
                    id: true,
                    name: true,
                }
                },
                sets: true,
                reps: true,
                duration: true,
                order: true,
            }
            },
            updatedAt: true,
        }
    });
}

export default async function WorkoutPage() {
    const session = await getServerSession(authOptions);
    const routines = await fetchRoutines(session.user.id);

    return (
        <>
            <PageHeading title="Start Workout" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-5">
            {routines.length > 0 ? 
                routines.map(routine => (
                        <Card key={routine.id}>
                            <CardHeader className="flex gap-3 bg-gray-800">
                                <Image
                                    height={40}
                                    radius="sm"
                                    src="/icons/tabler-icon-barbell-white.svg"
                                    width={40}
                                    alt="Barbell Icon"
                                />
                                <div className="flex flex-col">
                                    <p className="text-md text-truncate">{routine.name}</p>
                                    <p className="text-small text-default-500">Last updated: <FormattedDate dateString={routine.updatedAt} /></p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ol className="text-sm list-decimal list-inside">
                                    {routine.WorkoutPlanExercise.map((exerciseDetail) => (
                                        <li key={exerciseDetail.Exercise.id} className="my-1">
                                            {exerciseDetail.Exercise.name}
                                        </li>
                                    ))}
                                </ol>
                            </CardBody>
                            <CardFooter>
                                <Link as={NextLink} href={`/workout/${routine.id}`}>
                                    <Button size="sm" color="primary" className="gap-unit-1">
                                        <IconPlayerPlay size={16} />Start Workout</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                    : 
                        <p>No routines available, <Link as={NextLink} href="/routines/new">create one</Link> first.</p>
                    }
            </div>

        </>
    );
}