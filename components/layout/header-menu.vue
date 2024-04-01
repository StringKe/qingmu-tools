<script lang="ts">
import type { Tool } from '~/components/tools/tools';

function isToolGroupList(tools: Tool[] | Tool): tools is Tool[] {
    return Array.isArray(tools) && tools.some((tool) => tool.hasOwnProperty('children'));
}

function isTool(tools: Tool[] | Tool): tools is Tool {
    return !Array.isArray(tools);
}
</script>
<script lang="ts" setup>
const props = defineProps<{
    tools: Tool[] | Tool;
    level?: number;
}>();
const tools = toRef(props, 'tools');
const level = computed(() => props.level ?? 0);
</script>

<template>
    <template v-if="isToolGroupList(tools) && level === 0">
        <template
            v-for="toolGroup in tools"
            :key="toolGroup.path"
        >
            <MenubarMenu>
                <MenubarTrigger class="hidden md:flex">{{ $t(toolGroup.title) }}</MenubarTrigger>
                <MenubarContent>
                    <template
                        v-for="child in toolGroup.children"
                        :key="child.path"
                    >
                        <LayoutHeaderMenu
                            :level="level + 1"
                            :tools="child"
                        />
                    </template>
                </MenubarContent>
            </MenubarMenu>
        </template>
    </template>
    <template v-else-if="isToolGroupList(tools)">
        <MenubarSub>
            <MenubarSubTrigger>{{ $t(tools.title) }}</MenubarSubTrigger>
            <MenubarSubContent>
                <template
                    v-for="child in tools.children"
                    :key="child.path"
                >
                    <LayoutHeaderMenu
                        :level="level + 1"
                        :tools="child"
                    />
                </template>
            </MenubarSubContent>
        </MenubarSub>
    </template>
    <template v-else-if="isTool(tools)">
        <MenubarItem as-child>
            <NuxtLinkLocale
                :data-to="tools.path"
                :to="tools.path"
            >
                {{ $t(tools.title) }}
            </NuxtLinkLocale>
        </MenubarItem>
    </template>
</template>

<style lang="scss" scoped></style>
