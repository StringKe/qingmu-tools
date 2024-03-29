<script lang="ts" setup>
const app = useNuxtApp();
const i18n = useI18n();

watchEffect(() => {
    if (typeof window !== 'undefined') {
        console.log(app.$router.options, i18n);
    }
});
</script>

<template>
    <div>
        <Button>123</Button>
    </div>
</template>

<style lang="scss" scoped></style>
