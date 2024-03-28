import { dehydrate, hydrate, QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

import type { DehydratedState } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxt) => {
    const queryClient = new QueryClient({});

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
