<script lang="ts" setup>
import { IconSearch } from '~/components/icons';

const emit = defineEmits<{
    focused: [void];
}>();

const { isMacOS } = useDevice();

const shortcut = computed(() => {
    if (!isMacOS) {
        return 'Ctrl K';
    }
    return '⌘ K';
});

function onClick() {
    emit('focused');
}
</script>

<template>
    <div
        class="flex h-full items-center justify-center gap-2 border-l border-r px-3 py-0.5 text-muted hover:text-primary"
        @click="onClick"
    >
        <IconSearch class="transition" />
        <input
            :placeholder="$t('common.search_tools')"
            class="max-w-max[240px] h-full w-full min-w-[64px] rounded-none bg-background text-xs transition focus:outline-0"
            @focus="onClick"
        />
        <div class="min-w-max rounded border p-0.5 text-xs text-primary">{{ shortcut }}</div>
    </div>
</template>

<style lang="scss" scoped></style>
