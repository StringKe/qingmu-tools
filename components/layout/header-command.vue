<script lang="ts">
import type { Tool } from '~/components/tools/generated-helper';

declare type FlattenTool = Omit<Tool, 'children'>;
declare type GroupFlattenTool = Omit<Tool, 'children'> & { group: string };

function flattenTools(tools: Tool[]): FlattenTool[] {
    let flatList: Tool[] = [];

    tools.forEach((tool) => {
        const { children, ...restTool } = tool;
        flatList.push(restTool);
        if (children && children.length > 0) {
            flatList = flatList.concat(flattenTools(children));
        }
    });

    return flatList;
}

function buildTools(tools: FlattenTool[]): GroupFlattenTool[] {
    tools = tools.filter((tool) => !tool.title.includes('._title'));
    tools = tools.sort((a, b) => a.name.localeCompare(b.name));
    return tools.map((tool) => {
        const titleKeys = tool.title.split('.');
        return { ...tool, group: [...titleKeys.slice(0, 2), '_title'].join('.') };
    });
}
</script>
<script lang="ts" setup>
import { tools } from '~/components/tools/tools';

const localPath = useLocalePath();
const router = useRouter();

const allTools = buildTools(flattenTools(tools));
const open = ref(false);

const { Meta_K, Ctrl_K } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) e.preventDefault();
    },
});

function onFocused() {
    open.value = true;
}

function handleOpenChange() {
    open.value = !open.value;
}

function handleUpdate(url: string) {
    const path = localPath(url);
    if (path) {
        open.value = false;
        router.push(path);
    }
}

watch([Meta_K, Ctrl_K], (v) => {
    if (v[0] || v[1]) handleOpenChange();
});
</script>

<template>
    <LayoutSearch @focused="onFocused" />

    <CommandDialog
        v-model:open="open"
        @update:model-value="handleUpdate"
    >
        <CommandInput :placeholder="$t('common.search_tools')" />
        <CommandList>
            <CommandEmpty>{{ $t('common.no_tools') }}</CommandEmpty>
            <CommandGroup :heading="$t('common.tools')">
                <template v-for="tool in allTools">
                    <CommandItem
                        :value="tool.path"
                        class="flex items-center justify-between"
                    >
                        <span>
                            {{ $t(tool.title) }}
                        </span>
                        <Badge>
                            {{ $t(tool.group) }}
                        </Badge>
                    </CommandItem>
                </template>
            </CommandGroup>
        </CommandList>
    </CommandDialog>
</template>
<style lang="scss" scoped></style>
