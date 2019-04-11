import * as React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

export interface IModalButtonProps {
    text: string;
    icon?: React.ReactNode;
    className?: string;
    action: 'submit' | 'dismiss' | 'custom';
    onClick?: () => void;
}

export class ModalButton extends React.Component<IModalButtonProps> {
    static contextTypes = {
        onModalHide: PropTypes.func
    }
    
    render() {
        const { action, text, icon, className } = this.props;

        const content = icon ? (<span>{icon} {text}</span>) : text;

        switch (action) {
            case 'submit':
                return (
                    <button type="submit" className={cn('btn', className || 'btn-primary')}>{content}</button>
                );

            case 'dismiss':
                {
                    const onClick = (e: any) => {
                        e.preventDefault();
                        if (this.context.onModalHide) {
                            this.context.onModalHide();
                        }
                    };
                    return (
                        <button type="button" className={cn('btn', className || 'btn-secondary')} onClick={onClick}>{content}</button>
                    );
                }

            default:
                {
                    const onClick = (e: any) => {
                        e.preventDefault();
                        if (this.props.onClick) {
                            this.props.onClick();
                        }
                    };
                    return (
                        <button type="button" className={cn('btn', className || 'btn-primary')} onClick={onClick}>{content}</button>
                    );
                }
        }
    }


}
