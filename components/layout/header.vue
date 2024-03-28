<script lang="ts" setup></script>

<template>
    <div class="relative h-full w-full">
        <Menubar class="rounded-none border-l border-r-0 border-t-0 p-0">
            <NuxtLinkLocale to="/">
                <Button variant="link">Qingmu</Button>
            </NuxtLinkLocale>
            <MenubarMenu>
                <MenubarTrigger>编解码</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>JSON</MenubarItem>
                    <MenubarItem>Base64</MenubarItem>
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Email link</MenubarItem>
                            <MenubarItem>Messages</MenubarItem>
                            <MenubarItem>Notes</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
            <div class="ml-auto flex h-full items-center gap-2">
                <LayoutHeaderUser />
                <UtilsLanguageSwitch />
                <UtilsToggleTheme />
                <LayoutSearch />
            </div>
        </Menubar>
    </div>
</template>
