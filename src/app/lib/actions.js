'use server';

import { cookies } from 'next/headers';

export async function handleLogin(username, accessToken, refreshToken) {
    cookies().set('session_username', username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 2, // 2 hours
        path: '/'
    });

    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}

export async function resetAuthCookies(){
    cookies().set('session_username', '')
    cookies().set('session_access_token', '')
    cookies().set('session_refresh_token', '')
}

export async function getAccessToken() {
    let accessToken = cookies().get('session_access_token')?.value;
    return accessToken;
}
export async function getUsername() {
    let username = cookies().get('session_username')?.value;
    return username;
}