<script lang="ts" setup>
import { IconSearch } from '~/components/icons';
</script>

<template>
    <div
        class="flex h-full items-center justify-center gap-2 border-l border-r px-3 py-0.5 text-muted hover:text-primary"
    >
        <IconSearch class="transition" />
        <input
            class="max-w-max[240px] h-full w-full min-w-[64px] rounded-none bg-background text-xs transition focus:outline-0"
            placeholder="搜索其实很简单"
        />
    </div>
</template>

<style lang="scss" scoped></style>
