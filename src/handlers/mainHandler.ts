import { regHandler } from "./regHandler";

export const mainHandler = (data: unknown): string => {
    const message = JSON.parse(data as string);

    const type = message.type;

    if(type === 'reg') {
        return regHandler(message.data);
    }

    return '';
};
