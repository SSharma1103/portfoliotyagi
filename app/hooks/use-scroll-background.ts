"use client"

import { useEffect, useState } from "react"
import { calculateScrollColor } from "@/lib/color-animation"

interface ColorStop {
  color: string
  position: number // 0-1, where the color transition happens
}

export function useScrollBackground(colors: ColorStop[]) {
  const [backgroundColor, setBackgroundColor] = useState(colors[0].color)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY / scrollHeight

      const color = calculateScrollColor(scrolled, colors)
      setBackgroundColor(color)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [colors])

  return backgroundColor
}
