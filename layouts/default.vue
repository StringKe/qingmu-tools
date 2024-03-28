<script lang="ts" setup>
import { get } from 'lodash-es';

const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
});
const title = computed(() => t('layouts.title', { title: t(get<string>(route as never, 'meta.title', '页面')) }));
</script>

<template>
    <Html
        :dir="head.htmlAttrs.dir"
        :lang="head.htmlAttrs.lang"
    >
        <Head>
            <Title>{{ title }}</Title>
            <template
                v-for="link in head.link"
                :key="link.id"
            >
                <Link
                    :id="link.id"
                    :href="link.href"
                    :hreflang="link.hreflang"
                    :rel="link.rel"
                />
            </template>
            <template
                v-for="meta in head.meta"
                :key="meta.id"
            >
                <Meta
                    :id="meta.id"
                    :content="meta.content"
                    :property="meta.property"
                />
            </template>
        </Head>
        <Body>
            <div class="relative flex min-h-screen w-full flex-col">
                <LayoutHeader />
                <div class="relative min-h-0 w-full flex-1">
                    <slot />
                </div>
            </div>
        </Body>
    </Html>
</template>

<style scoped></style>
