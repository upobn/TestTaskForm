import * as React from 'react';
import cn from 'classnames';
import { LocationDescriptor } from 'history';
import { Link } from 'react-router-dom';
import { hideCurrentMenu } from './events';

const css = require('./context-menu.scss');

export type ItemKind = 'normal' | 'danger';

export interface ILinkMenuItemProps {
    icon?: React.ReactNode;
    to: LocationDescriptor;
    replace?: boolean;
    kind?: ItemKind;
}

export class LinkMenuItem extends React.Component<ILinkMenuItemProps, null> {
    render() {
        const { to, replace, icon, children, kind = 'normal' } = this.props;

        return (
            <Link to={to} replace={replace} className={cn('dropdown-item', kind === 'danger' ? 'text-danger' : null)}>
                <span className={css.icon}>{icon}</span>
                <span className={css.text}>{children}</span>
            </Link>
        );
    }
}

export interface IButtonMenuItemProps {
    icon?: React.ReactNode;
    kind?: ItemKind;
    enabled?: boolean;
    onClick: () => void;
}

export class ButtonMenuItem extends React.Component<IButtonMenuItemProps> {
    render() {
        const { icon, children, enabled = true, kind = 'normal' } = this.props;

        const onClick = (e: any) => {
            e.preventDefault();

            hideCurrentMenu();

            if (enabled) {
                this.props.onClick();
            }
            return false;
        };

        return (
            <a href="" className={cn('dropdown-item', kind === 'danger' ? 'text-danger' : null, !enabled ? 'text-light' : null)} onClick={onClick}>
                <span className={css.icon}>{icon}</span>
                <span className={css.text}>{children}</span>
            </a>
        );
    }
}

export class SeparatorMenuItem extends React.Component {
    render() {
        return (
            <div className="dropdown-divider" />
        );
    }
}
