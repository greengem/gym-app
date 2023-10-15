"use client";

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { TimerProvider } from '@/app/contexts/TimerContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <TimerProvider>
          {children}
        </TimerProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}