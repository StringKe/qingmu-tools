import LogtoClient from '@logto/node';
import { CookieStorage, LogtoRuntimeConfig } from '@logto/nuxt';

import type { H3Event } from 'h3';

export type TrpcContext = Awaited<ReturnType<typeof createContext>>;

export async function logtoClient(event: H3Event): Promise<LogtoClient> {
    const config = useRuntimeConfig(event);

    const logtoConfig = config.logto as LogtoRuntimeConfig;
    const {
        cookieName,
        cookieEncryptionKey,
        fetchUserInfo,
        pathnames,
        postCallbackRedirectUri,
        postLogoutRedirectUri,
        ...clientConfig
    } = logtoConfig;

    const url = getRequestURL(event);
    const storage = new CookieStorage(
        {
            cookieKey: cookieName,
            encryptionKey: cookieEncryptionKey,
            getCookie: (name) => getCookie(event, name),
            setCookie: (name, value, options) => {
                setCookie(event, name, value, options);
            },
        },
        { headers: event.headers, url: url.href },
    );

    await storage.init();

    return new LogtoClient(clientConfig, {
        navigate: async (url) => {
            await sendRedirect(event, url, 302);
        },
        storage,
    });
}

export async function createContext(event: H3Event) {
    const logto = await logtoClient(event);
    const isAuthenticated = await logto.isAuthenticated();

    return {
        logto,
        isAuthenticated,
        user: await logto.getIdTokenClaims().catch(() => null),
        fetchUserInfo: async () => {
            if (!isAuthenticated) {
                return null;
            }
            return await logto.fetchUserInfo();
        },
    };
}
