<script lang="ts">
import type { Tool, ToolGroup } from '~/pages/tools';

function isToolGroupList(tools: ToolGroup[] | ToolGroup | Tool): tools is ToolGroup[] {
    return Array.isArray(tools);
}

function isTool(tools: ToolGroup[] | ToolGroup | Tool): tools is Tool {
    return !Array.isArray(tools);
}

function isToolGroup(tools: ToolGroup[] | ToolGroup | Tool): tools is ToolGroup {
    return !Array.isArray(tools) && 'children' in tools;
}
</script>
<script lang="ts" setup>
const props = defineProps<{
    tools: ToolGroup[] | ToolGroup | Tool;
}>();
const tools = toRef(props, 'tools');
</script>

<template>
    <template v-if="isToolGroupList(tools)">
        <template
            v-for="tool in tools"
            :key="tool.path"
        >
            <MenubarMenu>
                <MenubarTrigger>{{ $t(tool.title) }}</MenubarTrigger>
                <MenubarContent>
                    <template
                        v-for="child in tool.children"
                        :key="child.path"
                    >
                        <LayoutHeaderMenu :tools="child" />
                    </template>
                </MenubarContent>
            </MenubarMenu>
        </template>
    </template>
    <template v-else-if="isToolGroup(tools)">
        <MenubarSub>
            <MenubarSubTrigger>{{ $t(tools.title) }}</MenubarSubTrigger>
            <MenubarSubContent>
                <template
                    v-for="child in tools.children"
                    :key="child.path"
                >
                    <LayoutHeaderMenu :tools="child" />
                </template>
            </MenubarSubContent>
        </MenubarSub>
    </template>
    <template v-else-if="isTool(tools)">
        <MenubarItem as-child>
            <NuxtLinkLocale
                :to="tools.path"
                :data-to="tools.path"
            >
                {{ $t(tools.title) }}
            </NuxtLinkLocale>
        </MenubarItem>
    </template>
    <template v-else></template>
</template>

<style lang="scss" scoped></style>
