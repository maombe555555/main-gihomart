import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set the initial value
    setIsMobile(mediaQuery.matches)

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Add the listener
    mediaQuery.addEventListener("change", handler)

    // Clean up
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return isMobile
}