const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function modifyPaths() {
  const exercises = await prisma.exercise.findMany({
    select: {
      id: true,
      imagePath: true,
    },
  });

  const updatedEntries = exercises.map((exercise) => {
    const newPath = exercise.imagePath.substring(0, exercise.imagePath.lastIndexOf('/') + 1);
    return {
      id: exercise.id,
      imagePath: newPath,
    };
  });

  for (let entry of updatedEntries) {
    await prisma.exercise.update({
      where: { id: entry.id },
      data: { imagePath: entry.imagePath },
    });
  }

  console.log('All paths updated!');
  await prisma.$disconnect();
}

modifyPaths();
