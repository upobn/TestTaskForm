import * as React from 'react';
import * as PropTypes from 'prop-types';

class ModalCloseButton extends React.Component {

    static contextTypes = {
        onModalHide: PropTypes.func
    }

    render() {
        const onClick = (e: any) => {
            e.preventDefault();
            if (this.context.onModalHide) {
                this.context.onModalHide();
            }
        };
        return (
            <button type="button" className="close" onClick={onClick} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        );
    }
}

export interface IModalHeaderProps {
    title: string;
    closeButton?: boolean;
}

export class ModalHeader extends React.Component<IModalHeaderProps> {
    render() {
        const { title, closeButton = true } = this.props;

        const closeButtonView = closeButton ? (<ModalCloseButton />) : null;

        return (
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                {closeButtonView}
            </div>
        );
    }
}
