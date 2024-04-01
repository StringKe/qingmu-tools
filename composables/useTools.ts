import { useStorage } from '@vueuse/core';

import type { Ref } from 'vue';

export function useToolValue<T = string>(defaultValue?: T, prefix?: string, namespace?: string): Ref<T | undefined> {
    const router = useRouter();
    const _namespace = computed(() => {
        const __namespace = namespace || router.currentRoute.value.fullPath;
        if (prefix) {
            return `${__namespace}.${prefix}`;
        }
        return __namespace;
    });

    return useStorage(_namespace.value, defaultValue);
}
