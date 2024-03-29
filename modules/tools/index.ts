import { readdirSync, statSync, writeFileSync } from 'node:fs';
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

function buildTreeJSON(tools: Tool[]) {
    // 根据 path 生成树形结构
    const tree = tools.reduce(
        (prev, current) => {
            const paths = current.path.split('/').filter(Boolean);
            let parent = prev;
            paths.forEach((path, index) => {
                if (index === paths.length - 1) {
                    parent[path] = current;
                } else {
                    parent[path] = parent[path] || {};
                    parent = parent[path];
                }
            });
            return prev;
        },
        {} as Record<string, any>,
    );

    return tree;
}

const VIEW_TEMPLATE = `
<script lang="ts" setup></script>

<template>
    <ClientOnly>
        %entrypoint%
    </ClientOnly>
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
        const tree = buildTreeJSON(tools.map((item) => omit(item, 'file') as never));

        // 在 basePath 下生成 generated.json
        const generatedPath = join(basePath, 'generated.json');
        writeFileSync(generatedPath, JSON.stringify(tree, null, 2));

        // 为所有 tools 生成被 ClientOnly 包裹的页面
        const pages = tools.map((tool) => {
            const componentName = startCase(tool.path.replaceAll('/', ' ')).split(' ').join('') + 'View';
            const autoImportName = `Tools${componentName}`;

            const viewFileName = `${tool.path.split('/').filter(Boolean).join('-')}-view.vue`;

            const res = addTemplate({
                filename: join('tools', viewFileName),
                getContents: () => {
                    return VIEW_TEMPLATE.replace('%entrypoint%', `<${autoImportName} />`);
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
    },
});
