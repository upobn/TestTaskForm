import * as React from 'react';
import cn from 'classnames';
import { IMenu, registerMenu, unregisterMenu, showMenu } from './events';
import { Nullable } from './../../common';

const css = require('./context-menu.scss');

export interface IContextMenuProps {
    id: string;
    className?: string;
}

export interface IContextMenuState {
    x: number;
    y: number;
    isOpen: boolean;
}

export class ContextMenu extends React.Component<IContextMenuProps, IContextMenuState> implements IMenu {

    id: string;
    domNode: any;

    constructor(props: any) {
        super(props);

        this.state = {
            x: 0,
            y: 0,
            isOpen: false
        };

        this.id = props.id;
    }

    componentDidMount() {
        registerMenu(this as Nullable<IMenu>);
    }

    componentWillUnmount() {
        unregisterMenu(this as Nullable<IMenu>);
    }

    render() {
        const { children } = this.props;
        const { x, y, isOpen } = this.state;
        const style: React.CSSProperties = { left: x, top: y, position: 'fixed', width: 'auto', height: 'auto' };

        return (
            <nav className={cn('dropdown-menu', css.contextMenu, isOpen ? 'show' : null)} style={style} ref={(node) => { if (node) { this.domNode = node; } }}>
                {children}
            </nav>
        )
    };

    open = (target: HTMLElement, x: number, y: number) => {
        showMenu(this.props.id, target, x, y);
    }

    show = (target: HTMLElement, x: number, y: number) => {
        this.setState({ ...this.state, isOpen: true, x, y });
    }

    hide = () => {
        this.setState({ ...this.state, isOpen: false });
    }
}
