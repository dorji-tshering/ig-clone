import { useState, useCallback, useEffect } from 'react';

// check for a media match
const useMediaQuery = (maxWidth: string) => {
    const [mediaMatch, setMediaMatch] = useState<boolean>(false);

    const updateTarget = useCallback((e: MediaQueryListEvent) => {
        if (e.matches) {
            setMediaMatch(true);
        } else {
            setMediaMatch(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
        media.addEventListener('change', updateTarget);

        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
            setMediaMatch(true);
        }

        return () => media.removeEventListener('change', updateTarget);
    }, []);

    return mediaMatch;
};

export default useMediaQuery;