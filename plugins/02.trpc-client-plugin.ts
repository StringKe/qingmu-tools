import { createTrpcVueClient, customFetchWrapper } from '@colonel-sandvich/trpc-vue-query';
import { useQueryClient } from '@tanstack/vue-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import superjson from 'superjson';

import type { AppRouter } from '~/server/routers';

export default defineNuxtPlugin(() => {
    const client = createTrpcVueClient<AppRouter>(
        {
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === 'development' ||
                        (opts.direction === 'down' && opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: '/api/trpc',
                    headers: useRequestHeaders(),
                    fetch: customFetchWrapper(),

                    // transformer: superjson,
                }),
            ],
            transformer: superjson,
        },
        useQueryClient(),
    );

    return {
        provide: {
            client,
        },
    };
});
