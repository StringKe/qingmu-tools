<script lang="ts" setup>
import { tools } from '../tools/tools';

watchEffect(() => {
    if (typeof window !== 'undefined') {
        console.log(tools);
    }
});
</script>

<template>
    <div class="relative h-full w-full">
        <Menubar class="rounded-none border-l border-r-0 border-t-0 p-0">
            <NuxtLinkLocale to="/">
                <Button variant="link">Qingmu</Button>
            </NuxtLinkLocale>
            <LayoutHeaderMenu :tools="tools" />

            <div class="mx-auto flex h-full items-center gap-2">
                <LayoutSearch />
            </div>
            <div class="flex h-full items-center gap-2">
                <LayoutHeaderUser />
                <UtilsLanguageSwitch />
                <UtilsToggleTheme />
            </div>
        </Menubar>
    </div>
</template>
