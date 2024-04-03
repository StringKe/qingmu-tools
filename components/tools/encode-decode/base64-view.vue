<script lang="ts" setup>
import type { MonacoEditor } from '#components';

import { useToolValue } from '~/composables/useTools';

const { t } = useI18n({ useScope: 'local' });

const inputMonacoEditor = useMonacoEditor();
const outputMonacoEditor = useMonacoEditor();

const model = ref<'encode' | 'decode'>('encode');
const input = useToolValue('', 'input');
const output = useToolValue('', 'output');
const encodeCharset = useToolValue<'utf-8' | 'utf-8-url' | 'gbk' | 'gb2312'>('utf-8', 'encode-charset');

watch([input, model], () => {
    if (model.value === 'encode') {
        output.value = window.btoa(input.value);
    } else {
        output.value = window.atob(input.value);
    }
});
</script>

<template>
    <CommonToolSidePanel>
        <div class="relative flex h-full w-full flex-col">
            <div class="relative flex flex-1 flex-col gap-2 border-b p-4">
                <h3 class="font-semibold leading-none tracking-tight">{{ t('input') }}</h3>
                <div class="h-full min-h-0 w-full flex-1">
                    <MonacoEditor
                        ref="inputMonacoEditor"
                        v-model="input"
                        :options="{
                            formatOnPaste: true,
                            formatOnType: true,
                            lineNumbers: 'on',
                        }"
                        class="h-full w-full border"
                    ></MonacoEditor>
                </div>
            </div>
            <div class="relative flex flex-1 flex-col gap-2 p-4">
                <h3 class="font-semibold leading-none tracking-tight">{{ t('output') }}</h3>
                <div class="h-full min-h-0 w-full flex-1">
                    <MonacoEditor
                        ref="outputMonacoEditor"
                        v-model="output"
                        :options="{
                            formatOnPaste: true,
                            formatOnType: true,
                            lineNumbers: 'on',
                            readOnly: true,
                        }"
                        class="h-full w-full border"
                    ></MonacoEditor>
                </div>
            </div>
        </div>
        <template #panel>
            <div class="grid grid-cols-1 gap-2 p-4">
                <Button
                    :class="{ 'bg-primary': model === 'encode' }"
                    @click="model = 'encode'"
                >
                    {{ t('encode') }}
                </Button>
                <Button
                    :class="{ 'bg-primary': model === 'decode' }"
                    @click="model = 'decode'"
                >
                    {{ t('decode') }}
                </Button>
                <Select v-model="encodeCharset">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="utf-8">UTF-8</SelectItem>
                        <SelectItem value="utf-8-url">UTF-8 URL</SelectItem>
                        <SelectItem value="gbk">GBK</SelectItem>
                        <SelectItem value="gb2312">GB2312</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </template>
    </CommonToolSidePanel>
</template>

<style lang="scss" scoped></style>

<i18n lang="json">
{
    "zh": {
        "input": "输入",
        "output": "输出",
        "switch_content": "切换内容",
        "encode": "编码",
        "decode": "解码"
    },
    "en": {
        "input": "Input",
        "output": "Output",
        "switch_content": "Switch Content",
        "encode": "Encode",
        "decode": "Decode"
    }
}
</i18n>
