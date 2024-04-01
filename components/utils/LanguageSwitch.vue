<script lang="ts" setup>
import { IconLanguage } from '~/components/icons';

const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                style-block
                variant="ghost"
            >
                <IconLanguage class="h-[1.2rem] w-[1.2rem] dark:text-white" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <template
                v-for="locale in locales"
                :key="locale.code"
            >
                <DropdownMenuItem as-child>
                    <NuxtLink :to="switchLocalePath(locale.code)">
                        {{ locale.name }}
                    </NuxtLink>
                </DropdownMenuItem>
            </template>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style lang="scss" scoped></style>
