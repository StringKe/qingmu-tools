import { buildTree, extendTool } from './generated-helper';

export type { Tool } from './generated-helper';

extendTool('/encode-decode/base64', () => ({
    shortcut: ['ctrl+shift+b', 'command+shift+b'],
}));

export const tools = buildTree();
