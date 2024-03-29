import type { LocaleMessage } from '~/locales/types';

export default <LocaleMessage>{
    layouts: {
        title: '{title} - 青木工具箱',
    },
    common: {},
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
