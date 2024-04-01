<script lang="ts" setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';

const route = useRoute();
const { t, te } = useI18n();
const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
});

const title = computed(() => {
    let title = 'Page';

    const toolsTitleKey = 'tools.' + route.path.replaceAll('/', '.').slice(1);
    if (te(toolsTitleKey)) {
        title = t(toolsTitleKey);
    }
    const toolsCategoryKey = `tools.${route.path.split('/')[1]}._title`;
    if (te(toolsCategoryKey)) {
        if (title != 'Page') {
            title = title + ' - ' + t(toolsCategoryKey);
        } else {
            title = t(toolsCategoryKey);
        }
    }

    return t('layouts.title', { title: title });
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
            <meta
                content="codeva-mgmGmlDKEd"
                name="baidu-site-verification"
            />
        </Head>
        <Body>
            <div class="relative flex min-h-screen w-full flex-col">
                <LayoutHeader />
                <div class="relative h-[calc(100vh-2.5rem)] w-full">
                    <slot />
                </div>
            </div>
            <SpeedInsights />
        </Body>
    </Html>
</template>

<style scoped></style>
