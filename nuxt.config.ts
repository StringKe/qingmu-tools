import { comlink } from 'vite-plugin-comlink';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxt/image',
        '@nuxt/eslint',
        '@nuxtjs/i18n',
        'shadcn-nuxt',
        '@logto/nuxt',
        '@nuxtjs/sitemap',
        'nuxt-monaco-editor',
        'unplugin-icons/nuxt',
    ],
    logto: {
        cookieName: 'user_token',
        pathnames: {
            signIn: '/auth/login',
            signOut: '/auth/logout',
            callback: '/auth/callback',
        },
    },
    monacoEditor: {
        locale: 'en',
    },
    site: {
        url: 'https://qingmu.dev',
    },
    css: ['~/assets/css/main.scss'],
    vite: {
        plugins: [comlink()],
    },
    i18n: {
        detectBrowserLanguage: false,
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
            },
            {
                code: 'zh',
                iso: 'zh-CN',
                name: '简体中文',
            },
        ],
        defaultLocale: 'en',
        vueI18n: './i18n.config.ts',
    },
    devtools: { enabled: true },
    tailwindcss: {
        cssPath: false,
    },
    tools: {
        path: './components/tools',
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    colorMode: {
        classSuffix: '',
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    eslint: {},
    typescript: {
        tsConfig: {
            compilerOptions: {
                types: ['unplugin-icons/types/vue3'],
            },
            include: ['../types/**/*.d.ts'],
        },
    },
    devServer: {
        port: 4100,
    },
});
