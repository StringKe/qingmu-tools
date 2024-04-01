import type { LocaleMessage } from '~/locales/types';

export default <LocaleMessage>{
    layouts: {
        title: '{title} - 青木工具箱',
    },
    common: {
        tools: '工具',
        no_tools: '没有可用的工具',
        search_tools: '搜索工具...',
    },
    tools: {
        'encode-decode': {
            _title: '编码 / 解码',

            base64: 'Base64',
        },
        formatter: {
            _title: '格式化',

            json: 'JSON',
        },
    },
};
