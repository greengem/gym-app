import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  const searchQuery = new URLSearchParams(request.url.split('?')[1]).get('q') || '';

  let results = [];
  if (searchQuery) {
    results = await prisma.exercise.findMany({
      where: {
        name: { 
          contains: searchQuery, 
          mode: 'insensitive' 
        },
      },
    });
  }

  return NextResponse.json(results);
};
