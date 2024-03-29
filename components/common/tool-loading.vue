<script lang="ts" setup>
const { t } = useI18n({ useScope: 'local' });
</script>

<template>
    <div class="flex h-full w-full items-center justify-center text-2xl font-medium">
        {{ t('loading') }}
    </div>
</template>

<style lang="scss" scoped></style>

<i18n lang="json">
{
    "zh": {
        "loading": "加载中..."
    },
    "en": {
        "loading": "Loading..."
    }
}
</i18n>
