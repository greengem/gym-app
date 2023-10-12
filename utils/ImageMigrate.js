const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateImagePaths() {
  const exercises = await prisma.exercise.findMany();
  
  for (let exercise of exercises) {
    const folderName = exercise.name.replace(/\//g, "_").replace(/\s+/g, "_");
    const imagePath = `/exercises/${folderName}/images/0.jpg`; 
    
    await prisma.exercise.update({
      where: { id: exercise.id },
      data: { imagePath }
    });
  }
}

updateImagePaths()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
