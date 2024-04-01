<script lang="ts" setup>
import { IconLanguage } from '~/components/icons';

const { model } = defineProps<{
    model?: 'popup' | 'inline';
}>();

const { locales, t } = useI18n({ useScope: 'local' });
const switchLocalePath = useSwitchLocalePath();

const openDialog = ref(false);
const router = useRouter();

function handleChangeLocale(code: string) {
    const path = switchLocalePath(code);
    openDialog.value = false;
    router.push(path);
}
</script>

<template>
    <DropdownMenu v-if="model !== 'popup'">
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
                    <template
                        v-for="locale in locales"
                        :key="locale.code"
                    >
                        <Button @click="handleChangeLocale(locale.code)">
                            {{ locale.name }}
                        </Button>
                    </template>
                </div>
            </DialogContent>
        </Dialog>
    </template>
</template>

<style lang="scss" scoped></style>

<i18n lang="json">
{
    "zh": {
        "title": "切换语言"
    },
    "en": {
        "title": "Switch Language"
    }
}
</i18n>
