import { useStorage } from '@vueuse/core';

import type { Ref } from 'vue';

export function useToolValue<T = string>(defaultValue?: T, namespace?: string): Ref<T | undefined> {
    const router = useRouter();
    const _namespace = computed(() => {
        return namespace || router.currentRoute.value.fullPath;
    });

    return useStorage(_namespace.value, defaultValue);
}
