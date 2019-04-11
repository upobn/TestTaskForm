// import * as keycomb from 'keycomb';
const keycomb = require('keycomb');
import keycodes from './keycodes';

export interface IHotkey {
    name: string;
    shouldHandle(e: KeyboardEvent): boolean;
}

class Hotkey implements IHotkey {
    
    name: string;

    constructor(private ctrlKey: boolean, private altKey: boolean, private shiftKey: boolean, private keyCode: number[]) {
        const name = `${ctrlKey ? 'Ctrl+' : ''}${altKey ? 'Alt+' : ''}${shiftKey ? 'Shift+' : ''}${keycodes(keyCode[0])}`;
        this.name = name;
    }
    shouldHandle(e: KeyboardEvent): boolean {
        return (e.ctrlKey === this.ctrlKey &&
            e.altKey === this.altKey &&
            e.shiftKey === this.shiftKey &&
            this.keyCode.length === 1 &&
            e.keyCode === this.keyCode[0]);
    }
}

export function parseHotkey(str?: string): IHotkey | null {
    if (!str) {
        return null;
    }

    const { keyCode, ctrlKey = false, altKey = false, shiftKey = false } = keycomb(str);
    if (!keyCode) {
        return null;
    }

    return new Hotkey(ctrlKey, altKey, shiftKey, keyCode);
}
