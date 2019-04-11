import * as React from 'react';
import { Link } from 'react-router-dom';
import { IDataGridColumn } from './model';

export interface IDataGridCellProps {
    column: IDataGridColumn;
    rowUrl?: string;
    data: any;
}

export class DataGridCell extends React.Component<IDataGridCellProps> {
    render() {
        const { column, rowUrl, data } = this.props;
        const title = column.title && column.title.toString();
        let rowContent = column.render(data);
        if (rowUrl) {
            rowContent = <Link to={rowUrl}>{rowContent}</Link>;
        }

        if (column.isRowScope) {
            return <th scope="row" title={title}>{rowContent}</th>;
        }

        return <td title={title}>{rowContent}</td>;
    }
}
