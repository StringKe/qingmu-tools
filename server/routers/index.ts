import { protectedProcedure, publicProcedure, router } from '../trpc';

export const appRouter = router({
    helloName: publicProcedure.query(() => `Hello world!`),
    changeName: protectedProcedure.query(() => 'Hello world!'),
});

export type AppRouter = typeof appRouter;
