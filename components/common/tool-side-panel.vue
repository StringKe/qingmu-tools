<script lang="ts" setup>
defineSlots<{
    default: () => void;
    panel: () => void;
}>();
</script>

<template>
    <div class="relative flex h-full min-h-full w-full">
        <div class="relative h-full min-h-0 flex-1 border-r">
            <slot />
        </div>
        <div class="relative h-full min-h-0 w-[320px]">
            <slot name="panel" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
