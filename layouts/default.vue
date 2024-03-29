<script lang="ts" setup>
import { get } from 'lodash-es';

const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
});

const title = computed(() => {
    let titleKey = 'tools.' + route.path.replaceAll('/', '.').slice(1);
    let name = t(titleKey);
    if (!name.length) {
        titleKey = get<string>(route as never, 'meta.title', 'Page');
        name = t(titleKey);
    } else {
        titleKey = `tools.${route.path.split('/')[1]}._title`;
        name = `${name} ${t(titleKey)}`;
    }
    return t('layouts.title', { title: name });
});
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
                <div class="relative h-[calc(100vh-2.5rem)] w-full">
                    <slot />
                </div>
            </div>
        </Body>
    </Html>
</template>

<style scoped></style>
