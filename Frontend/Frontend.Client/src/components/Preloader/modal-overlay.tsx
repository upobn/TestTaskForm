import * as React from 'react';
import cn from 'classnames';

const css = require('./preloader.css');
const Spinner = require('-!svg-react-loader!./spinner.svg');


export interface IModalPreloaderOverlayProps {
    inProgress?: boolean | null;
    title?: string;
}

export class ModalPreloaderOverlay extends React.Component<IModalPreloaderOverlayProps> {
    render() {
        const { inProgress, title, children } = this.props;

        if (inProgress) {
            return (
                <div className={css.modalPreloaderInProgress}>
                    <div className={css.content} onClick={this.onClick}>
                        {children}
                    </div>

                    <div className={cn('border', 'border-primary', css.spinnerBox)}>
                        <Spinner />
                        <p>{title}</p>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {children}
            </div>
        );
    }

    onClick(e: any){
        e.stopPropagation();
    }
}
