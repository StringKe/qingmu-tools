<script lang="ts" setup>
import { ComboboxRoot, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

import { cn } from '~/utils/cn';

const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>(), {
    open: true,
    modelValue: '',
});

const emits = defineEmits<ComboboxRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <ComboboxRoot
        :class="
            cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', props.class)
        "
        v-bind="forwarded"
    >
        <slot />
    </ComboboxRoot>
</template>
