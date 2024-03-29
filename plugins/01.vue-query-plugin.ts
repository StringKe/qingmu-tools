import { dehydrate, hydrate, QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { TRPCClientError } from '@trpc/client';

import type { DehydratedState } from '@tanstack/vue-query';

const retry = (failureCount: number, error: Error) => {
    if (error instanceof TRPCClientError) {
        if (error.data.code === 'UNAUTHORIZED') {
            if (process.client) {
                window.dispatchEvent(
                    new Event('unauthorized', {
                        bubbles: true,
                        cancelable: true,
                    }),
                );
            }
            // 不允许重试
            return false;
        }
    }
    return failureCount < 3;
};

export default defineNuxtPlugin((nuxt) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry },
            mutations: { retry },
        },
    });

    nuxt.vueApp.use(VueQueryPlugin, { queryClient });

    const vueQueryState = useState<DehydratedState | null>('vue-query');

    if (process.server) {
        nuxt.hooks.hook('app:rendered', () => {
            vueQueryState.value = dehydrate(queryClient);
        });
    }

    if (process.client) {
        nuxt.hooks.hook('app:created', () => {
            hydrate(queryClient, vueQueryState.value);
        });
    }
});
