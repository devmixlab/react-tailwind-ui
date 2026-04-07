import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        let timeout: number | null = null;

        const onResize = () => {
            if (timeout) clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                setWidth(window.innerWidth);
            }, 50); // 50ms throttle
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            if (timeout) clearTimeout(timeout);
        };
    }, []);

    return width;
};
