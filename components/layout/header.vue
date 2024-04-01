<script lang="ts" setup>
import { IconBrandGithub, IconLanguage, IconMenu, IconTheme } from '~/components/icons';

import { tools } from '../tools/tools';

const { t } = useI18n({ useScope: 'local' });
</script>

<template>
    <div class="relative h-full w-full">
        <Menubar class="rounded-none border-l border-r-0 border-t-0 p-0">
            <NuxtLinkLocale to="/">
                <Button variant="link">Qingmu</Button>
            </NuxtLinkLocale>
            <LayoutHeaderMenu :tools="tools" />

            <div class="ml-auto flex h-full items-center gap-2 md:mx-auto">
                <LayoutHeaderCommand />
            </div>
            <div class="hidden h-full items-center gap-2 md:flex">
                <Button
                    as-child
                    variant="link"
                >
                    <a
                        href="https://github.com/StringKe/qingmu-tools"
                        target="_blank"
                    >
                        <IconBrandGithub class="h-[1.2rem] w-[1.2rem] dark:text-white" />
                    </a>
                </Button>
                <UtilsLanguageSwitch />
                <UtilsToggleTheme />
            </div>
            <Dialog>
                <DialogTrigger class="flex md:hidden">
                    <Button
                        style-block
                        variant="ghost"
                    >
                        <IconMenu class="h-[1.2rem] w-[1.2rem] dark:text-white" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{{ t('title') }}</DialogTitle>
                    </DialogHeader>
                    <div class="flex flex-col gap-2">
                        <Button as-child>
                            <a
                                href="https://github.com/StringKe/qingmu-tools"
                                target="_blank"
                            >
                                <IconBrandGithub class="mr-1 h-[1.2rem] w-[1.2rem]" />
                                Github
                            </a>
                        </Button>
                        <UtilsLanguageSwitch model="popup">
                            <Button>
                                <IconLanguage class="mr-1 h-[1.2rem] w-[1.2rem]" />
                                {{ t('lang_title') }}
                            </Button>
                        </UtilsLanguageSwitch>

                        <UtilsToggleTheme model="popup">
                            <Button>
                                <IconTheme class="d mr-1 h-[1.2rem] w-[1.2rem]" />
                                {{ t('theme_title') }}
                            </Button>
                        </UtilsToggleTheme>
                    </div>
                </DialogContent>
            </Dialog>
        </Menubar>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "title": "Menu",
        "lang_title": "Select Language",
        "theme_title": "Toggle Theme"
    },
    "zh": {
        "title": "菜单",
        "lang_title": "选择语言",
        "theme_title": "切换主题"
    }
}
</i18n>
