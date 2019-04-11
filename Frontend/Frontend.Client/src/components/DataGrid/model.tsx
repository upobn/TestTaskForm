export interface IDataGridColumn {
    name: string;
    render: (item: any) => JSX.Element | string | null;
    isRowScope?: boolean;
    title?: (item: any) => string;
}

export interface IDataGridAction {
    icon?: React.ReactNode;
    name?: string | null;
    type?: string | null;
    isSeparator?: boolean;
    handle: ((item: any) => void) | null;
    condition?: (item: any) => boolean;
}

export type DataGridActionMode = 'context-menu' | 'inline-actions' | 'both';

export interface IDataGridModel {
    columns: IDataGridColumn[];
    actions: IDataGridAction[];
    actionMode?: DataGridActionMode;
    rowLink?: (item: any) => string;
    rowClass?: (item: any) => string | null;
}
