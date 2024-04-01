import type { MonacoEditor } from '#components';

export function useMonacoEditor() {
    const editorRef = ref<InstanceType<typeof MonacoEditor>>();
    // monaco editor not support dynamic change language
    // const { locale } = useI18n();
    const colorMode = useColorMode();

    watchEffect(() => {
        const editor = editorRef.value?.$editor;
        if (editor) {
            editor.updateOptions({
                theme: colorMode.value === 'dark' ? 'vs-dark' : 'vs',
            });
        }
    });

    return editorRef;
}
