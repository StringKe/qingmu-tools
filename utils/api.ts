// import { createTrpcVueClient, customFetchWrapper } from '@colonel-sandvich/trpc-vue-query';
// import { useQueryClient } from '@tanstack/vue-query';
// import { httpBatchLink } from '@trpc/client';
//
// import type { AppRouter } from '~/server/routers';
//
// export const apiClient = createTrpcVueClient<AppRouter>(
//     {
//         links: [
//             httpBatchLink({
//                 url: '/api/trpc',
//                 headers: useRequestHeaders(),
//                 fetch: customFetchWrapper(),
//             }),
//         ],
//     },
//     useQueryClient(),
// );
