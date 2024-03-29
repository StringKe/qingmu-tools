export declare type ToolsMessages = {
    [key: string]: string | ToolsMessages;
};

export declare type LocaleMessage = {
    layouts: {
        title: string;
    };
    common: Record<string, string>;
    tools: ToolsMessages;
};
