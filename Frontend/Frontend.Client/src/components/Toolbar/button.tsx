import * as React from "react";
import cn from 'classnames';
import { IHotkey, parseHotkey } from "..";

// const css = require('./toolbar.scss');
// import './toolbar.css';

export type ToolbarButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'light' | 'dark' | 'link';

export function __evalButtonClass(type: ToolbarButtonType) {
    switch (type) {
        case 'primary':
            return 'btn-outline-primary';
        case 'secondary':
            return 'btn-outline-secondary';
        case 'success':
            return 'btn-outline-success';
        case 'danger':
            return 'btn-outline-danger';
        case 'info':
            return 'btn-outline-info';
        case 'light':
            return 'btn-outline-light';
        case 'dark':
            return 'btn-outline-dark';
        case 'link':
            return 'btn-link';
        default:
            return 'btn-primary';
    }
}

export interface IToolbarButtonPropsBase {
    icon?: React.ReactNode;
    text?: string;
    title?: string;
    type?: ToolbarButtonType;
    enabled?: boolean;
    hotkey?: string;
}

export interface IToolbarButtonProps extends IToolbarButtonPropsBase {
    onClick?: () => void;
}

interface IToolbarButtonState {
    hotkey: IHotkey | null;
}

export class ToolbarButton extends React.Component<IToolbarButtonProps, IToolbarButtonState> {
    constructor(props: Readonly<IToolbarButtonProps>) {
        super(props);
        this.state = { hotkey: parseHotkey(props.hotkey) };
    }

    componentWillMount() {
        document.addEventListener('keydown', this);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this);
    }

    componentWillReceiveProps(nextProps: Readonly<IToolbarButtonProps>) {
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

            const { onClick = () => { } } = this.props;
            onClick();
        }
    }

    render() {
        const {
            icon,
            text,
            type = 'dark',
            enabled = true,
            onClick = () => { }
        } = this.props;

        const buttonClass = __evalButtonClass(type);
        const title = this.getTitleText();

        const content = !icon ? text : !text ? icon : <span>{icon}<span className="toolbarBtnText">{text}</span></span>;

        return (
            <button type="button" className={cn('btn', 'btn-sm', buttonClass)} title={title} onClick={onClick} disabled={!enabled}>
                {content}
            </button>
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

export interface IToolbarSubmitButtonProps extends IToolbarButtonPropsBase { }


interface IToolbarSubmitButtonState {
    hotkey: IHotkey | null;
}

export class ToolbarSubmitButton extends React.Component<IToolbarSubmitButtonProps, IToolbarSubmitButtonState> {

    private ref: HTMLButtonElement = { } as HTMLButtonElement;

    constructor(props: Readonly<IToolbarSubmitButtonProps>) {
        super(props);
        this.state = { hotkey: parseHotkey(props.hotkey) };
    }


    componentWillMount() {
        document.addEventListener('keydown', this);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this);
    }

    componentWillReceiveProps(nextProps: Readonly<IToolbarSubmitButtonProps>) {
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

            if (this.ref) {
                this.ref.click();
            }
        }
    }

    render() {
        const {
            icon,
            text,
            type = 'primary',
            enabled = true
        } = this.props;
        const title = this.getTitleText();

        const buttonClass = __evalButtonClass(type);

        const onRef = (ref: any) => {
            this.ref = ref;
        }

        const content = !icon ? text : !text ? icon : <span>{icon}<span className="toolbarBtnText">{text}</span></span>;

        return (
            <button type="submit" className={cn('btn', 'btn-sm', buttonClass)} title={title} disabled={!enabled} ref={onRef}>
                {content}
            </button>
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

export class ToolbarButtonGroup extends React.Component {
    render() {
        return (
            <div className="btn-group">
                {this.props.children}
            </div>
        );
    }
}
