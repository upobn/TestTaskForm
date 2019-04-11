import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IModalProps {
    isOpen: boolean;
    name?: string;
    onClosed?: () => void;
}

export interface IModalContext {
    onClosed: () => void;
}

const MODAL_BACKDROP_ID = '___ui_modal_backdrop';

const modalStack: string[] = [];

let modalUid = 0;

const getModalBackdrop = () => {
    let backdrop = document.getElementById(MODAL_BACKDROP_ID);
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = MODAL_BACKDROP_ID;
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);

        backdrop.addEventListener('click', (e) => { closeModal(); });
    }

    return backdrop;
}

const openModal = (modal: Modal) => {
    if (!modal.name) {
        modalUid++;
        modal.name = 'M_' + modalUid;
    }

    if (modalStack.length > 0 && modalStack[modalStack.length - 1] === modal.name) {
        return;
    }

    modalStack.push(modal.name);

    const backdrop = getModalBackdrop();
    backdrop.style.display = 'block';
};

const closeModal = (modal?: Modal) => {
    if (modal && modalStack.length > 0 && modalStack[modalStack.length - 1] !== modal.name) {
        return;
    }

    modalStack.pop();

    if (modalStack.length === 0) {
        const backdrop = getModalBackdrop();
        backdrop.style.display = 'none';
    }
};

export class Modal extends React.Component<IModalProps> {
    
    static childContextTypes = {
        onModalHide: PropTypes.func
    };

    public name: string | undefined;
    
    constructor(props: IModalProps) {
        super(props);
        this.name = props.name;
    }    

    close() {
        if (this.props.onClosed) {
            this.props.onClosed();
        }
    }

    componentDidMount() {
        if (this.props.isOpen) {
            openModal(this);
        } else {
            closeModal(this);
        }
    }

    componentDidUpdate(prevProps: IModalProps, prevState: any) {
        if (!prevState || prevState.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                openModal(this);
            } else {
                closeModal(this);
            }
        }
    }

    render() {
        const { isOpen, children } = this.props;
        if (!isOpen) {
            return null;
        }

        let fadeDiv: any = null;
        const onRef = (div: any) => {
            fadeDiv = div;
        }

        const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === fadeDiv) {
                this.close();
            }
        };

        return (
            <div className="modal fade show" role="dialog" style={{ display: 'block', overflow: 'auto' }} ref={onRef} onClick={onClick}>
                {children}
            </div>
        );
    }

    getChildContext() {
        return { onModalHide: this.props.onClosed };
    }
}
