"use client"

import { useCallback, useState } from 'react';

function useProfileLoader(user: any, supabase: any) {
    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState<any | null>(null);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from('profile')
                .select(`display_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            setProfileData(data);
        } catch (error) {
            console.log(error);
            // alert('Error loading user data!')
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    return { loading, profileData, getProfile };
}

export default useProfileLoader;