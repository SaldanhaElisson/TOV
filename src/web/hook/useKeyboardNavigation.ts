
import { useEffect } from 'react';

export const useKeyboardNavigation = (key: string, callback: () => void) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === key) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [key, callback]);
};