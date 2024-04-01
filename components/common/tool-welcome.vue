<script lang="ts" setup>
import type { Tool } from '~/components/tools/tools';

import { tools } from '~/components/tools/tools';

const localePath = useLocalePath();

const props = defineProps<{
    basePath: string;
}>();

function filterTools(tools: Tool[], basePath: string) {
    if (basePath === '/') return tools;

    return tools.reduce((acc, tool) => {
        if (tool.path === basePath) {
            acc.push(tool);
        } else if (tool.path.startsWith(basePath)) {
            if (tool.children && tool.children.length > 0) {
                const children = filterTools(tool.children, basePath);
                if (children.length > 0) {
                    acc.push({ ...tool, children });
                }
            }
        }
        return acc;
    }, [] as Tool[]);
}

const filteredTools = computed(() => filterTools(tools, props.basePath));
</script>

<template>
    <div class="container mx-auto mt-4 grid grid-cols-1 gap-6">
        <template v-for="tool in filteredTools">
            <div>
                <NuxtLinkLocale
                    :to="localePath(tool.path)"
                    class="text-3xl font-bold tracking-tight"
                >
                    {{ $t(tool.title) }}
                </NuxtLinkLocale>
                <div class="mt-4 grid grid-cols-4 gap-2">
                    <template
                        v-for="child in tool.children"
                        :key="child.path"
                    >
                        <NuxtLinkLocale
                            :to="localePath(child.path)"
                            class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm transition hover:bg-primary hover:text-white"
                        >
                            {{ $t(child.title) }}
                        </NuxtLinkLocale>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
