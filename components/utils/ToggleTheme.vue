<script lang="ts" setup>
import { IconMoon, IconSun } from '~/components/icons';

const { model } = defineProps<{
    model?: 'popup' | 'inline';
}>();

const { t } = useI18n({ useScope: 'local' });

const colorMode = useColorMode();

const openDialog = ref(false);

function onToggleTheme(value: string) {
    colorMode.preference = value;
    openDialog.value = false;
}
</script>

<template>
    <DropdownMenu v-if="model !== 'popup'">
        <DropdownMenuTrigger as-child>
            <Button
                style-block
                variant="ghost"
            >
                <IconMoon
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <IconSun
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">{{ t('title') }}</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="onToggleTheme('light')">{{ t('light') }}</DropdownMenuItem>
            <DropdownMenuItem @click="onToggleTheme('dark')">{{ t('dark') }}</DropdownMenuItem>
            <DropdownMenuItem @click="onToggleTheme('system')">{{ t('system') }}</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <template v-else>
        <Dialog v-model:open="openDialog">
            <DialogTrigger as-child>
                <slot />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{{ t('title') }}</DialogTitle>
                </DialogHeader>
                <div class="flex flex-col gap-2">
                    <Button @click="onToggleTheme('light')">{{ t('light') }}</Button>
                    <Button @click="onToggleTheme('dark')">{{ t('dark') }}</Button>
                    <Button @click="onToggleTheme('system')">{{ t('system') }}</Button>
                </div>
            </DialogContent>
        </Dialog>
    </template>
</template>

<i18n lang="json">
{
    "zh": {
        "title": "切换主题",
        "light": "浅色",
        "dark": "深色",
        "system": "跟随系统"
    },
    "en": {
        "title": "Toggle Theme",
        "light": "Light",
        "dark": "Dark",
        "system": "System"
    }
}
</i18n>
