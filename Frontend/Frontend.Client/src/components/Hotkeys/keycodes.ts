'use strict';

const keys: any = {
    'Ctrl': 17,
    'Control': 17,
    'Alt': 18,
    'Option': 18,
    'Shift': 16,
    'Windows': 91,
    'Command': 91,
    'Esc': 27,
    'Escape': 27,
    '`': 192,
    '-': 189,
    '=': 187,
    'Backspace': 8,
    'Tab': 9,
    '\\': 220,
    '[': 219,
    ']': 221,
    ';': 186,
    '\'': 222,
    'Enter': 13,
    'Return': 13,
    ',': 188,
    '.': 190,
    '/': 191,
    'Space': 32,
    'Pause': 19,
    'Break': 19,
    'Insert': 45,
    'Delete': 46,
    'Nome': 36,
    'End': 35,
    'Page Up': 33,
    'Page Down': 34,
    '\u2190': 37,
    '\u2191': 38,
    '\u2192': 39,
    '\u2193': 40,
    'Caps Lock': 20,
    'Num Lock': 144,
    'Scroll Lock': 145
};

for (let f = 1; f < 20; f++) {
    keys['f' + f] = 111 + f;
}

export default function (input: number) {
    for (const k in keys) {
        if (keys.hasOwnProperty(k)) {
            if (keys[k] === input) {
                return k;
            }
        }
    }

    return String.fromCharCode(input).toUpperCase();
}
