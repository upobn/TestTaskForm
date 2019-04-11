import * as React from 'react';
import cn from 'classnames'
import { ToolbarLabel, ToolbarButton } from '..';
import * as fa from '../icons';


export interface IToolbarPaginationProps {
    page: number;
    pageSize: number;
    totalCount: number;

    onNavigate?: (page: number, pageSize?: number) => void;
}

export class ToolbarPagination extends React.Component<IToolbarPaginationProps> {
    onNavigateBack() {
        const { page, onNavigate } = this.props;
        // const pageCount = Math.ceil(totalCount / pageSize);

        const canGoBack = page > 0;
        if (canGoBack && onNavigate) {
            onNavigate(page - 1);
        }
    }

    onNavigateForward() {
        const { page, pageSize, totalCount, onNavigate } = this.props;
        const pageCount = Math.ceil(totalCount / pageSize);

        const canGoForward = page < pageCount - 1;
        if (canGoForward && onNavigate) {
            onNavigate(page + 1);
        }
    }
    
    render() {
      
        const { page, pageSize, totalCount, onNavigate } = this.props;
        const pageCount = Math.ceil(totalCount / pageSize);

        const label = `Стр. ${page + 1} / ${pageCount}`;
        const title = `Страница ${page + 1} из ${pageCount}\nВсего ${totalCount} записей\nОтображается по ${pageSize} записей на странице.`;

        const canGoBack = page > 0;
        const canGoForward = page < pageCount - 1;

        const onNavigateBack = () => {
            if (canGoBack && onNavigate) {
                onNavigate(page - 1);
            }
        };

        const onNavigateForward = () => {
            if (canGoForward && onNavigate) {
                onNavigate(page + 1);
            }
        };

        const goBackBtn = canGoBack ?
            (
                <ToolbarButton icon={<fa.ArrowLeft />} title="Предыдущая страница" onClick={onNavigateBack} hotkey="Ctrl+Left"/>
            ) : (
                <ToolbarButton icon={<fa.ArrowLeft />} title="Предыдущая страница" enabled={false} type="dark" />
            );

        const goForwardBtn = canGoForward ?
            (
                <ToolbarButton icon={<fa.ArrowRight />} title="Следующая страница" onClick={onNavigateForward} hotkey="Ctrl+Right" />
            ) : (
                <ToolbarButton icon={<fa.ArrowRight />} title="Следующая страница" enabled={false} type="dark" />
            );

        return (
            <div className={cn('d-inline-flex', 'pagination')}>
                <ToolbarLabel title={title} text={label} />
                <div className="btn-group">
                    {goBackBtn}
                    {goForwardBtn}
                </div>
            </div>
        );
    }
}
