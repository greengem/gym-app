import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

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
            createdAt: true,
            updatedAt: true,
        }
    });
}

export default async function WorkoutPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    const routines = await fetchRoutines(session.user.id);

    return (
        <>
            <PageHeading title="Start Workout" />
            <h4 className="font-semibold text-xl mb-5">My Routines:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {routines.map(routine => (
                        <Card key={routine.id}>
                            <CardHeader className="flex gap-3">
                                <Image
                                    className="bg-white"
                                    height={40}
                                    radius="sm"
                                    src="/icons/tabler-icon-barbell.svg"
                                    width={40}
                                />
                                <div className="flex flex-col">
                                    <p className="text-md text-truncate">{routine.name}</p>
                                    <p className="text-small text-default-500">nextui.org</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ol className="text-sm text-gray-500">
                                    {routine.WorkoutPlanExercise.map((exerciseDetail) => (
                                        <li key={exerciseDetail.Exercise.id}>
                                            {exerciseDetail.Exercise.name}
                                        </li>
                                    ))}
                                </ol>
                            </CardBody>
                            <CardFooter>
                                <Link as={NextLink} href={`/workout/${routine.id}`}>
                                    <Button color="primary" className="gap-unit-1">
                                        <IconPlayerPlay size={16} />Start Workout</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
            </div>

        </>
    );
}