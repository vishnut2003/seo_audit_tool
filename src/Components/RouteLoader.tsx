'use client';

import { useEffect, useState } from 'react';
import { RiLoaderLine } from '@remixicon/react';

export default function RouteLoader() {

    const { isLoading } = useGlobalFetchLoader();

    return isLoading && (
        <div className="fixed inset-0 z-[9999] flex gap-3 items-center justify-center bg-white/90">
            <RiLoaderLine
                size={40}
                className='animate-spin text-themesecondary'
            />
        </div>
    );
}

function useGlobalFetchLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let fetchCount = 0;

        const originalFetch = window.fetch;

        const customFetch = async (...args: Parameters<typeof fetch>) => {
            fetchCount++;
            setIsLoading(true);

            try {
                const response = await originalFetch(...args);
                return response;
            } finally {
                fetchCount--;
                if (fetchCount === 0) {
                    setIsLoading(false);
                }
            }
        };

        // Override
        window.fetch = customFetch;

        return () => {
            window.fetch = originalFetch; // restore original
        };
    }, []);

    return { isLoading };
}