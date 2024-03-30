import { existsSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { omit, startCase } from 'lodash-es';
import { addTemplate, createResolver, defineNuxtModule, extendPages } from 'nuxt/kit';

function readAllFile(path: string): string[] {
    const files = readdirSync(path);
    const result: string[] = [];
    for (const file of files) {
        const fullPath = join(path, file);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            result.push(...readAllFile(fullPath));
        } else {
            result.push(fullPath);
        }
    }
    return result.filter((file) => file.endsWith('-view.vue'));
}

type Tool = {
    file: string;
    name: string;
    path: string;
};

function parserTools(BASE_PATH: string, path: string): Tool {
    const relativePath = path.replace(BASE_PATH, '');
    const urlPath = relativePath.replace('-view.vue', '');
    const name = urlPath.split('/').pop()!;

    return {
        file: path,
        name,
        path: urlPath,
    };
}

const TOOL_VIEW_TEMPLATE = `
<script lang="ts" setup></script>

<template>
    <ClientOnly>
        %entrypoint%
        <template #fallback>
            <CommonToolLoading />
        </template>
    </ClientOnly>
</template>

<style lang="scss" scoped></style>
`;

const TOOL_INDEX_TEMPLATE = `
<script lang="ts" setup></script>

<template>
    <CommonToolWelcome base-path="%base-path%" />
</template>

<style lang="scss" scoped></style>
`;

export default defineNuxtModule({
    meta: {
        name: 'tools',
    },
    async setup({ path }, nuxt) {
        const ROOT_DIR_PATH = nuxt.options.rootDir;
        const { resolve, resolvePath } = createResolver(ROOT_DIR_PATH);
        const basePath = resolve(path);

        const toolsPaths = readAllFile(basePath);
        const tools = toolsPaths.map((path) => parserTools(basePath, path));

        // 在 basePath 下生成 generated.json
        const generatedPath = join(basePath, 'generated.json');
        writeFileSync(
            generatedPath,
            JSON.stringify(
                tools.map((item) => omit(item, 'file')),
                null,
                4,
            ),
        );

        if (existsSync(join(nuxt.options.buildDir, 'tools'))) {
            rmSync(join(nuxt.options.buildDir, 'tools'), { recursive: true });
        }

        // 为所有 tools 生成被 ClientOnly 包裹的页面
        const pages = tools.map((tool) => {
            const componentName = startCase(tool.path.replaceAll('/', ' ')).split(' ').join('') + 'View';
            const autoImportName = `Tools${componentName}`;
            const viewFileName = `${tool.path.split('/').filter(Boolean).join('-')}-view.vue`;

            const res = addTemplate({
                filename: join('tools', viewFileName),
                getContents: () => {
                    return TOOL_VIEW_TEMPLATE.replace('%entrypoint%', `<${autoImportName} />`);
                },
                write: true,
            });

            return { item: tool, dst: res.dst, name: viewFileName.replace('.vue', '') };
        });

        extendPages((loadedPages) => {
            pages.forEach(({ item, dst, name }) => {
                loadedPages.push({
                    name,
                    path: item.path,
                    file: dst,
                });
            });
        });

        const uniqueBasePaths = new Set(
            tools.map((tool) => {
                const segments = tool.path.split('/');
                segments.pop(); // 移除最后一个元素，通常是工具的具体名称
                return segments.join('/');
            }),
        );

        const indexPages = [...uniqueBasePaths.values()]
            .map((basePath) => {
                if (basePath) {
                    // 忽略空的 basePath
                    const baseName = startCase(basePath.replaceAll('/', ' ')).split(' ').join('') + 'Index';
                    const indexFileName = `${basePath.split('/').filter(Boolean).join('-')}-index.vue`;

                    const page = addTemplate({
                        filename: join('tools/index', indexFileName),
                        getContents: () => {
                            return TOOL_INDEX_TEMPLATE.replace('%base-path%', basePath);
                        },
                        write: true,
                    });

                    return {
                        dst: page.dst,
                        baseName,
                        basePath,
                    };
                }
            })
            .filter(Boolean) as { dst: string; baseName: string; basePath: string }[];

        extendPages((loadedPages) => {
            indexPages.forEach(({ dst, baseName, basePath }) => {
                loadedPages.push({
                    name: baseName,
                    path: basePath,
                    file: dst,
                });
            });
        });
    },
});
