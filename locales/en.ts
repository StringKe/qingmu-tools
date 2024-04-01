import type { LocaleMessage } from '~/locales/types';

export default <LocaleMessage>{
    layouts: {
        title: '{title} - Qingmu Tools',
    },
    common: {
        tools: 'Tools',
        no_tools: 'No tools available',
        search_tools: 'Type to search tools',
    },
    tools: {
        'encode-decode': {
            _title: 'Encode / Decode',

            json: 'JSON',
            base64: 'Base64',
        },
        formatter: {
            _title: 'Formatter',

            json: 'JSON',
        },
    },
};
