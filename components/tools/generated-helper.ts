import type { FunctionalComponent, SVGAttributes } from 'vue';

import _generateTools from './generated.json';

declare type GenerateTool = {
    name: string;
    path: string;
    [key: string]: any;
};

const generateTools: GenerateTool[] = _generateTools;

export declare type Tool = {
    name: string;
    path: string;
    title: string;
    keywords?: string[];
    shortcut?: string[];
    icon?: FunctionalComponent<SVGAttributes, {}, any, {}> | string;
    children?: Tool[];
};

export function extendTool(path: string, handle: (tool: GenerateTool) => Partial<Tool>) {
    const tool = generateTools.find((tool) => tool.path === path);
    if (tool) {
        const value = handle(tool);
        generateTools.splice(generateTools.indexOf(tool), 1);
        generateTools.push({ ...tool, ...value });
    }
}
export function buildTree(): Tool[] {
    const pathToNodeMap: Map<string, Tool> = new Map();
    let allShortcuts: string[] = [];

    generateTools.forEach((genTool) => {
        const segments = genTool.path.split('/').filter((segment) => segment);
        let currentPath = '';

        segments.forEach((segment, index) => {
            currentPath += (currentPath ? '/' : '') + segment;
            const isLastSegment = index === segments.length - 1;

            if (!pathToNodeMap.has(currentPath)) {
                // 基于路径创建基础翻译键
                const baseTranslationKey = `tools.${currentPath.replace(/\//g, '.')}`;

                const node: Tool = {
                    name: segment,
                    path: `/${currentPath}`,
                    // 对于 group 类型（非叶子节点），标题键额外拼接 `._title`
                    title: baseTranslationKey + (isLastSegment ? '' : '._title'),
                    children: [],
                    keywords: [],
                };

                if (index > 0) {
                    const parentPath = segments.slice(0, index).join('/');
                    const parentNode = pathToNodeMap.get(parentPath);
                    parentNode?.children?.push(node);
                }

                pathToNodeMap.set(currentPath, node);
            }
        });

        const toolNode = pathToNodeMap.get(genTool.path);
        if (toolNode) {
            // 检查快捷键冲突
            const shortcutHasConflict = genTool.shortcut?.some((shortcut: string) => allShortcuts.includes(shortcut));
            if (shortcutHasConflict) {
                console.error(`Shortcut conflict: ${genTool.path}`);
                throw new Error(`Shortcut conflict: ${genTool.path}`);
            }
            if (genTool.shortcut) {
                allShortcuts = [...allShortcuts, ...genTool.shortcut];
            }

            const hasChildren = !!(toolNode.children?.length && toolNode.children.length > 0);

            // 更新 toolNode 的属性，特别是对 group 类型节点的标题进行特别处理
            Object.assign(toolNode, {
                ...genTool,
                // 如果当前节点有子节点，则认为它是一个 group，所以需要拼接 `._title`
                title: hasChildren ? toolNode.title + '._title' : toolNode.title,
                shortcut: genTool.shortcut,
                keywords: [...(genTool.keywords ?? []), genTool.path],
            });
        }
    });

    // 返回结果时跳过根级节点
    return Array.from(pathToNodeMap.values()).filter((node) => node.path.split('/').length === 2);
}
