<script lang="ts" setup>
import { editor as RawEditor } from 'monaco-editor';

import type { MonacoEditor } from '#components';

const editorRef = ref<InstanceType<typeof MonacoEditor>>();

const { t } = useI18n({ useScope: 'local' });
const input = ref('');

function onRemoveEscape() {
    input.value = JSON.stringify(JSON.parse(input.value), null, 4);
}

function onCopy() {
    navigator.clipboard.writeText(input.value);
}

function onReadonly() {
    const editor = editorRef.value?.$editor;
    if (editor) {
        const readOnly = editor.getOption(RawEditor.EditorOption.readOnly);
        editor.updateOptions({ readOnly: !readOnly });
    }
}
</script>

<template>
    <CommonToolSidePanel>
        <MonacoEditor
            ref="editorRef"
            v-model="input"
            :options="{
                formatOnPaste: true,
                formatOnType: true,
                lineNumbers: 'on',
            }"
            class="h-full w-full"
            lang="json"
        ></MonacoEditor>
        <template #panel>
            <div class="grid grid-cols-1 gap-2 p-4">
                <div class="flex items-center space-x-2">
                    <Checkbox
                        id="readonly-mode"
                        @update:checked="onReadonly"
                    />
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="readonly-mode"
                    >
                        {{ t('readonly') }}
                    </label>
                </div>
                <Button @click="onRemoveEscape">
                    {{ t('remove_escape') }}
                </Button>
                <Button @click="onCopy">
                    {{ t('copy') }}
                </Button>
            </div>
        </template>
    </CommonToolSidePanel>
</template>

<style lang="scss" scoped></style>

<i18n lang="json">
{
    "zh": {
        "readonly": "编辑器只读",
        "remove_escape": "去除转义",
        "copy": "复制"
    },
    "en": {
        "readonly": "Editor Readonly Mode",
        "remove_escape": "Remove Escape",
        "copy": "Copy"
    }
}
</i18n>
