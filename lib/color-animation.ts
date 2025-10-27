function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)]
    : [0, 0, 0]
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16)
        return hex.length === 1 ? "0" + hex : hex
      })
      .join("")
  )
}

/**
 * Interpolates between two hex colors based on a factor (0-1)
 * @param color1 - Starting hex color
 * @param color2 - Ending hex color
 * @param factor - Interpolation factor (0 = color1, 1 = color2)
 * @returns Interpolated hex color
 */
export function interpolateColor(color1: string, color2: string, factor: number): string {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)

  const r = r1 + (r2 - r1) * factor
  const g = g1 + (g2 - g1) * factor
  const b = b1 + (b2 - b1) * factor

  return rgbToHex(r, g, b)
}

interface ColorStop {
  color: string
  position: number // 0-1, where the color transition happens
}

/**
 * Calculates the interpolated color based on scroll progress and color stops
 * @param scrollProgress - Current scroll progress (0-1)
 * @param colors - Array of color stops
 * @returns Interpolated hex color
 */
export function calculateScrollColor(scrollProgress: number, colors: ColorStop[]): string {
  // Find the two colors to interpolate between
  let color1 = colors[0]
  let color2 = colors[colors.length - 1]

  for (let i = 0; i < colors.length - 1; i++) {
    if (scrollProgress >= colors[i].position && scrollProgress <= colors[i + 1].position) {
      color1 = colors[i]
      color2 = colors[i + 1]
      break
    }
  }

  // Calculate interpolation factor
  const range = color2.position - color1.position
  const factor = (scrollProgress - color1.position) / range

  // Interpolate between colors
  return interpolateColor(color1.color, color2.color, Math.max(0, Math.min(1, factor)))
}
