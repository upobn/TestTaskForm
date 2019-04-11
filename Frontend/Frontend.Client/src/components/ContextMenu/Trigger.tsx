import * as React from 'react';
import { showMenu } from './events';

export interface IContextMenuTriggerProps {
    id?: string;
    tag?: string;
    className?: string;
    onClick?: (x: number, y: number, target: HTMLElement) => void;
}

export class ContextMenuTrigger extends React.Component<IContextMenuTriggerProps> {
    render() {
        const { tag = "div", className, children } = this.props;

        const props: React.HTMLAttributes<any> = {
            onContextMenu: this.handleContextMenu,
            className
        };

        return React.createElement(tag, props, children);
    };

    handleContextMenu = (e: React.MouseEvent<any> | React.TouchEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();

        const mouseEvent = e as React.MouseEvent<any>;
        const touchEvent = e as React.TouchEvent<any>;

        mouseEvent.stopPropagation();
        mouseEvent.preventDefault();

        touchEvent.stopPropagation();
        touchEvent.preventDefault();

        const x = mouseEvent.clientX || (touchEvent.touches && touchEvent.touches[0].pageX);
        const y = mouseEvent.clientY || (touchEvent.touches && touchEvent.touches[0].pageY);

        const { id, onClick } = this.props;
        if (onClick) {
            onClick(x, y, e.target as HTMLElement);
        } else if (id && this.props.id) {
            showMenu(this.props.id, e.target as HTMLElement, x, y);
        } else {
            console.error('ContextMenuTrigger: neither "id" nor "onClick" props were specified');
        }
    };
}
