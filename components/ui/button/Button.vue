<script lang="ts" setup>
import { Primitive } from 'radix-vue';

import type { ButtonVariants } from '.';
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

import { cn } from '~/utils/cn';

import { buttonVariants } from '.';

interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
    class?: HTMLAttributes['class'];
    styleBlock?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
});
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="
            cn(buttonVariants({ variant, size }), props.class, {
                'rounded-none': props.styleBlock,
            })
        "
    >
        <slot />
    </Primitive>
</template>
