<script lang="ts" setup>
import type { Tool } from '~/components/tools/tools';

import { tools } from '~/components/tools/tools';

const props = defineProps<{
    basePath: string;
}>();

// 定义递归函数来筛选工具
function filterTools(tools: Tool[], basePath: string) {
    // 如果 basePath 为根路径，则返回所有工具
    if (basePath === '/') return tools;

    // 筛选出符合 basePath 的工具或工具组
    return tools.reduce((acc, tool) => {
        // 如果工具的路径正好匹配 basePath，直接添加
        if (tool.path === basePath) {
            acc.push(tool);
        } else if (tool.path.startsWith(basePath)) {
            // 如果是工具组且路径以 basePath 开头，递归查找
            if (tool.children && tool.children.length > 0) {
                const children = filterTools(tool.children, basePath);
                if (children.length > 0) {
                    // 只添加有匹配子项的工具组
                    acc.push({ ...tool, children });
                }
            }
        }
        return acc;
    }, [] as Tool[]);
}

const filteredTools = computed(() => filterTools(tools, props.basePath));

watchEffect(() => {
    console.log(filteredTools.value);
});
</script>

<template>
    <div class="container mx-auto mt-4 grid grid-cols-1">
        <template v-for="tool in filteredTools">
            <div>
                <h2 class="text-3xl font-bold tracking-tight">{{ $t(tool.title) }}</h2>
                <div class="grid grid-cols-4 gap-2">
                    <template
                        v-for="child in tool.children"
                        :key="child.path"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>{{ $t(child.title) }}</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent> 123</CardContent>
                        </Card>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
