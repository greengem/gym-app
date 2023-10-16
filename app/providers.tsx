"use client";

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { StopwatchProvider } from '@/app/contexts/SimpleTimerContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <StopwatchProvider>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        
          {children}
        
      </NextThemesProvider>
    </NextUIProvider>
    </StopwatchProvider>
  )
}