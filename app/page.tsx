import { getServerSession } from 'next-auth'
import HeroSection from './HeroSection';

import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  
  return (
    <HeroSection />
  );
}
