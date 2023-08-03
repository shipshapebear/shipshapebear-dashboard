"use client"
import { useEffect, useState } from 'react';
function useImageDownloader(url: string | null | undefined, supabase: any, bucketName: string) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    useEffect(() => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage.from(bucketName).download(path);
                if (error) {
                    throw error;
                }
                const url = URL.createObjectURL(data);
                setImageUrl(url);
            } catch (error) {
                console.log('Error downloading image: ', error);
            }
        }

        if (url) {
            downloadImage(url);
        }

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl); // Clean up object URL on unmount
            }
        };
    }, [url, supabase]);

    return imageUrl;
}

export default useImageDownloader;