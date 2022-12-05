import { useEffect, useState } from "react";

/**
 * Check if the device-width <= 767px
 */
export default function isMobile() {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
        const mediaWatcher = window.matchMedia("(max-width: 767px)")
        setIsMobile(mediaWatcher.matches);

        function updateIsNarrowScreen(e: MediaQueryListEvent) {
            setIsMobile(e.matches);
        }
        
        mediaWatcher.addEventListener('change', updateIsNarrowScreen)

        return function cleanup() {
            mediaWatcher.removeEventListener('change', updateIsNarrowScreen);
        }
    },[])

    return isMobile
}

