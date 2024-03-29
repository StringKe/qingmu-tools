import type { FunctionalComponent, SVGAttributes } from 'vue';

export declare type PTool = {
    path: string;
    keywords?: string[];
    icon?: FunctionalComponent<SVGAttributes, {}, any, {}> | string;
    shortcut?: string[];
};

export declare type PToolGroup = {
    path: string;
    children: (PTool | PToolGroup)[];
    icon?: FunctionalComponent<SVGAttributes, {}, any, {}> | string;
};

export declare type PTools = PToolGroup[];

export const presetTools: PTools = [
    {
        path: 'encode-decode',
        children: [
            {
                path: 'base64',
            },
        ],
    },
    {
        path: 'formatter',
        children: [
            {
                path: 'json',
            },
        ],
    },
];

export declare type Tool = {
    name: string;
    path: string;
    title: string;
    keywords: string[];
    shortcut?: string[];
    icon?: FunctionalComponent<SVGAttributes, {}, any, {}> | string;
};

export declare type ToolGroup = {
    name: string;
    path: string;
    title: string;
    children: (Tool | ToolGroup)[];
};

export declare type Tools = ToolGroup[];

function buildTools(): Tools {
    let allShortcuts: string[] = [];

    function buildToolsRecursively(presetTools: (PToolGroup | PTool)[], prefix = ''): (Tool | ToolGroup)[] {
        return presetTools.map((presetTool) => {
            const path = `${prefix.length === 0 ? '' : `${prefix}/`}${presetTool.path}`;
            const title = `tools.${path.replace(/\//g, '.')}`;
            if ('children' in presetTool) {
                return {
                    name: presetTool.path,
                    path: `/${path}`,
                    title: `${title}._title`,
                    children: buildToolsRecursively(presetTool.children, path),
                    icon: presetTool.icon,
                } as ToolGroup;
            }

            const shortcutHasConflict = presetTool.shortcut?.some((shortcut) => allShortcuts.includes(shortcut));
            if (shortcutHasConflict) {
                console.error(`Shortcut conflict: ${presetTool.path}`);
                throw new Error(`Shortcut conflict: ${presetTool.path}`);
            }
            if (presetTool.shortcut) {
                allShortcuts = [...allShortcuts, ...presetTool.shortcut];
            }

            return {
                name: presetTool.path,
                path: `/${path}`,
                title,
                keywords: [...(presetTool.keywords ?? []), presetTool.path],
                shortcut: presetTool.shortcut,
                icon: presetTool.icon,
            } as Tool;
        });
    }

    return buildToolsRecursively(presetTools) as Tools;
}

export const tools = buildTools();
