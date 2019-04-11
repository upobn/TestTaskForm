import * as React from 'react';
import cn from 'classnames';
import { DataGridCell } from './cell'
import { IDataGridModel } from './model';
import { ContextMenuTrigger } from '../ContextMenu';

const css = require('./datagrid.scss');

export interface IDataGridRowProps {
    model: IDataGridModel;
    data: any;
    onContextMenu: (x: number, y: number, target: HTMLElement, data: any) => void;
}

export class DataGridRow extends React.Component<IDataGridRowProps> {
    render() {
        const { model, data } = this.props;
        const useInlineActions = model.actionMode === 'inline-actions' || model.actionMode === 'both';
        const useContextMenuActions = model.actionMode === 'context-menu' || model.actionMode === 'both';
        const rowUrl = model.rowLink && model.rowLink(data);
        const rowClass = model.rowClass && model.rowClass(data);

        const cells = model.columns.map((column, i) => <DataGridCell key={i} column={column} data={data} rowUrl={rowUrl} />);
        if (useInlineActions) {

            let currentBtnGroupContent: any[] = [];
            const actionsCellContents: any[] = [];

            model.actions.forEach((action, i) => {
                if (action.isSeparator) {
                    if (currentBtnGroupContent.length > 0) {
                        actionsCellContents.push(
                            <span className={cn('btn-group', css.actionBtnGroup)} key={actionsCellContents.length}>{currentBtnGroupContent}</span>
                        );
                        currentBtnGroupContent = [];
                    }
                    return;
                }

                if (action.condition && !action.condition(data)) {
                    return;
                }

                const onClick = (e: any) => {
                    e.preventDefault();
                    if (action.handle) {
                        action.handle(data);
                    }
                };
                const actionButton = (
                    <a href="#"
                        key={i}
                        className={cn('btn', 'btn-outline-' + (action.type || 'primary'), css.actionBtn)}
                        title={action.name ? action.name : ""}
                        onClick={onClick}>
                        {action.icon}
                    </a>
                );

                currentBtnGroupContent.push(actionButton);
            });

            if (currentBtnGroupContent.length > 0) {
                actionsCellContents.push(
                    <span className={cn('btn-group', css.actionBtnGroup)} key={actionsCellContents.length}>{currentBtnGroupContent}</span>
                );
            }

            const actionsCell = (
                <td key="actions">
                    {actionsCellContents}
                </td>
            );
            cells.push(actionsCell);
        }

        if (useContextMenuActions) {
            return (
                <ContextMenuTrigger className={cn(rowClass, css.dataGridRow)} tag="tr" onClick={this.onContextMenuClick}>
                    {cells}
                </ContextMenuTrigger>
            );
        } else {
            return (
                <tr className={cn(rowClass, css.dataGridRow)}>
                    {cells}
                </tr>
            );
        }
    }

    onContextMenuClick(x: number, y: number, target: HTMLElement) {
        this.props.onContextMenu(x, y, target, this.props.data)
    }
}

