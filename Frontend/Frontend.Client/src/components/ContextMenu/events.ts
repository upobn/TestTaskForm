export const MENU_SHOW = 'REACT_CONTEXTMENU_SHOW';
export const MENU_HIDE = 'REACT_CONTEXTMENU_HIDE';

type Nullable<T> = T | null;

export interface IMenu {
    id: string;
    domNode: HTMLElement;
    show: (target: HTMLElement, x: number, y: number) => void;
    hide: () => void;
}

const menus: { [key: string]: IMenu } = {};
let activeMenu: Nullable<IMenu> = null;

export function registerMenu(menu: Nullable<IMenu> ) {
    ensureInitialized();
    if(menu){
        menus[menu.id] = menu;
    }
}

export function unregisterMenu(menu: Nullable<IMenu> ) {
    ensureInitialized();
    if(menu){
        if (activeMenu && activeMenu.id === menu.id) {
            hideMenu(menu.id);
        }
        delete menus[menu.id];
    }
}

export function showMenu(id: string, target: HTMLElement, x: number, y: number) {
    ensureInitialized();
    const menu = menus[id];
    if (menu) {
        menu.show(target, x, y);
        activeMenu = menu;
    }
}

export function hideMenu(id: string) {
    ensureInitialized();
    const menu = menus[id];
    if (menu) {
        menu.hide()
        activeMenu = null;
    }
}

export function hideCurrentMenu(predicate?: (menu: IMenu) => boolean) {
    if (!activeMenu) {
        return;
    }

    if (predicate && !predicate(activeMenu)) {
        return;
    }

    hideMenu(activeMenu.id);
}

function handleKeydown(e: KeyboardEvent) {
    if (!activeMenu) {
        return;
    }

    switch (e.keyCode) {
        case 27: // Escape 
            e.preventDefault();
            e.stopPropagation();
            hideMenu(activeMenu.id);
            break;
    }
}

let isInitialized = false;

function ensureInitialized() {
    if (isInitialized) {
        return;
    }

    document.addEventListener('mousedown', (e) => {
        hideCurrentMenu(menu => !menu.domNode || !menu.domNode.contains(e.target as Node));
    });
    document.addEventListener('ontouchstart', (e) => {
        hideCurrentMenu(menu => !menu.domNode || !menu.domNode.contains(e.target as Node));
    });
    document.addEventListener('scroll', (e) => {
        hideCurrentMenu();
    });
    document.addEventListener('keydown', handleKeydown);

    document.addEventListener('resize', (e) => {
        hideCurrentMenu();
    });
    document.addEventListener('contextmenu', (e) => {
        hideCurrentMenu();
    }, true);

    isInitialized = true;
}
