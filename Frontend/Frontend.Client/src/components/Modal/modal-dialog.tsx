import * as React from 'react';
import cn from 'classnames';

const css = require('./modal.css');

export interface IModalDialogProps {
    onSubmit?: () => void;
}

export class ModalDialog extends React.Component<IModalDialogProps> {
    render() {
        const onSubmit = (e: any) => {
            e.preventDefault();
            if (this.props.onSubmit) {
                this.props.onSubmit();
            }
        }

        return (
            <div className={cn('modal-dialog', css.modal)} role="document">
                <form onSubmit={onSubmit} className="modal-content">                    
                    {this.props.children}
                </form>
            </div>
        );
    }
}
