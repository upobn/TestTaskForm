/**
 * Handler сохранения файла
 */
export type ISaveFile = (file: Blob) => void;

/**
 * Handler откртыия файла
 */
export interface IOpenFile {
    (): void;
    canOpen: boolean;
}