import * as React from 'react';
import { IDataGridModel, IDataGridColumn, IDataGridAction } from './model';
import { DataGridRow } from './row';
import { ContextMenu, SeparatorMenuItem, ButtonMenuItem, ItemKind } from '../ContextMenu';

export interface IDataGridProps {
    model: IDataGridModel;
    data: any[];
}

interface IDataGridState {
    id: string;
    actionDataItem: any;
}

let dataGridId: number = 1;

export class DataGrid extends React.Component<IDataGridProps, IDataGridState> {

    static action<T>(
        name: string,
        icon: React.ReactNode,
        handle: (item: T) => void,
        type?: string,
        condition?: (item: T) => boolean): IDataGridAction {
        return { name, icon, handle, type, condition };
    }

    static separator(): IDataGridAction {
        return { name: null, icon: null, handle: null, type: null, isSeparator: true };
    }

    static column<T>(name: string, render: (item: T) => JSX.Element | string | null, isRowScope?: boolean, title?: (item: T) => string): IDataGridColumn {
        return { name, render, isRowScope, title };
    }

    private contextMenu: ContextMenu = new ContextMenu({});

    constructor(props: IDataGridProps) {
        super(props);
        this.state = { id: `data-grid-${dataGridId}`, actionDataItem: null };
        dataGridId++;
    }

    render() {
        const { model, data } = this.props;

        const onContextMenu = (x: number, y: number, target: HTMLElement, item: any) => {
            this.setState({ ... this.state, actionDataItem: item });
            this.contextMenu.open(target, x, y);
        };

        if (!data || data.length === 0) {
            return (
                <div className="alert alert-warning" role="alert">
                    Нет данных для отображения
                </div>
            );
        }

        return (

            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {model.columns.map((c, i) => <th key={i}>{c.name}</th>)}
                            {
                                (model.actionMode === 'inline-actions' || model.actionMode === 'both')
                                    ? <th>Действия</th>
                                    : null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, i) => <DataGridRow key={i} model={model} data={item} onContextMenu={onContextMenu} />)
                        }
                    </tbody>
                </table>

                <ContextMenu id={this.state.id} ref={(ref) => { if (ref) { this.contextMenu = ref; } }}>
                    {
                        model.actions.map((action, i) => {
                            if (action.isSeparator) {
                                return <SeparatorMenuItem key={i} />
                            }

                            const enabled = !action.condition || !this.state.actionDataItem || action.condition(this.state.actionDataItem);
                            if (!enabled) {
                                return null;
                            }

                            const onClick = () => {
                                if (action.handle) {
                                    action.handle(this.state.actionDataItem);
                                }
                            };

                            return <ButtonMenuItem
                                key={i}
                                icon={action.icon}
                                kind={action.type as ItemKind}
                                onClick={onClick}>
                                {action.name}
                            </ButtonMenuItem>
                        })
                    }
                </ContextMenu>
            </div>
        );
    }
}

