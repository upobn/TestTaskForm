import * as React from 'react';
import cn from 'classnames';

export interface IModalBodyProps {
    modalPrefix?: string;
    className?: string;
}

export class ModalBody extends React.Component<IModalBodyProps> {
    static getDefaultPrefix() {
        return 'modal';
    }

    render() {
        const { modalPrefix, children, className, ...props } = this.props;
        const prefix = modalPrefix || ModalBody.getDefaultPrefix();

        return (
            <div {...props} className={cn(className, prefix + '-body')}>
                {children}
            </div>
        );
    }
}
