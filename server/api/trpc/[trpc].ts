import { createNuxtApiHandler } from '@colonel-sandvich/trpc-vue-query';

import { appRouter } from '~/server/routers';
import { createContext } from '~/server/trpc/context';

export default createNuxtApiHandler({
    router: appRouter,
    createContext,
    onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            console.error('TRPC Error', error);
        }
    },
});
