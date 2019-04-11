import * as React from 'react';
import cn from 'classnames';
import { IToolbarButtonPropsBase, __evalButtonClass } from '.';
import { LocationDescriptor } from 'history';
import { Link } from 'react-router-dom';
import { IHotkey, parseHotkey } from '..';
import * as PropTypes from 'prop-types';
import { Nullable } from '../../common';


export interface IToolbarLinkButtonProps extends IToolbarButtonPropsBase {
    to: LocationDescriptor;
    replace?: boolean;
    hyperlink?: boolean;
    target?: string;
    hotkey?: string;
}

interface IToolbarLinkButtonState {
    hotkey: Nullable<IHotkey> ;
}

export class ToolbarLinkButton extends React.Component<IToolbarLinkButtonProps, IToolbarLinkButtonState> {
    static contextTypes = {
        router: PropTypes.shape({
          history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired,
            createHref: PropTypes.func.isRequired
          }).isRequired
        }).isRequired
      }
    constructor(props: Readonly<IToolbarLinkButtonProps>) {
        super(props);
        this.state = { hotkey: parseHotkey(props.hotkey) };
    }

    componentWillMount() {
        document.addEventListener('keydown', this);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this);
    }

    componentWillReceiveProps(nextProps: Readonly<IToolbarLinkButtonProps>) {
        if (nextProps.hotkey !== this.props.hotkey) {
            this.setState({ ...this.state, hotkey: parseHotkey(nextProps.hotkey) });
        }
    }

    handleEvent(e: Event) {
        const { hotkey } = this.state;
        const { enabled = true } = this.props;

        if (hotkey && e.type === 'keydown' && enabled && hotkey.shouldHandle(e as KeyboardEvent)) {
            e.preventDefault();
            e.stopPropagation();

            const { history } = this.context.router;
            const { replace, to } = this.props;
            if (replace) {
                history.replace(to);
            } else {
                history.push(to);
            }
        }
    }

    render() {
        const {
            to,
            replace,
            icon,
            text,
            type = 'dark',
            hyperlink = false,
            target,
            enabled = true
        } = this.props;
        const title = this.getTitleText();

        const buttonClass = __evalButtonClass(type);

        const content = !icon ? text : !text ? icon : <span>{icon}<span className="toolbarBtnText">{text}</span></span>;

        if (hyperlink) {
            return (<a href={to.toString()} target={target} className={cn('btn', 'btn-sm', buttonClass, !enabled ? 'disabled' : null)} title={title}>
                {content}
            </a>
            );
        }

        return (
            <Link to={to} replace={replace} className={cn('btn', 'btn-sm', buttonClass, !enabled ? 'disabled' : null)} title={title}>
                {content}
            </Link>
        )
    }

    private getTitleText(): string | undefined {
        const { text, title = text } = this.props;
        const { hotkey } = this.state;

        if (hotkey) {
            if (title) {
                return `${title}\n(${hotkey.name})`;
            } else {
                return hotkey.name;
            }
        }

        return title;
    }
}
