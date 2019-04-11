import * as React from 'react';
import cn from 'classnames';
import * as fa from '../icons';

const css = require('./preloader.css');
const Spinner = require('-!svg-react-loader!./spinner.svg');

export interface IPreloaderOverlayProps {
    inProgress?: boolean | null;
    error?: any | null;
    title?: string;
    dismissError?: () => void;
    retry?: () => void;
}

export class PreloaderOverlay extends React.Component<IPreloaderOverlayProps> {
    render() {
        const { inProgress, error, title, children, dismissError, retry } = this.props;

        if (inProgress) {
            return (
                <div className={css.preloaderInProgress}>
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

        if (error) {
            let closeBtn = null;

            if (dismissError) {
                const onDismiss = (e: any) => {
                    e.preventDefault();
                    dismissError();
                };

                closeBtn = (
                    <button type="button" className="close" aria-label="Close" onClick={onDismiss}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                );
            }

            let buttonRow = null;
            if (retry || dismissError) {
                let dismissErrorBtn = null;
                if (dismissError) {
                    const onDismiss = (e: any) => {
                        e.preventDefault();
                        dismissError();
                    };

                    dismissErrorBtn = (
                        <button type="button" className="btn btn-outline-danger" onClick={onDismiss}>
                            <fa.Check /> Закрыть
                        </button>
                    );
                }

                const retryBtn = null;
                if (retry) {
                    const onRetry = (e: any) => {
                        e.preventDefault();
                        retry();
                    };

                    dismissErrorBtn = (
                        <button type="button" className="btn btn-outline-danger" onClick={onRetry}>
                            <fa.Refresh /> Попробовать еще раз
                        </button>
                    );
                }

                buttonRow = (
                    <div className="mb-0">
                        <hr />
                        {dismissErrorBtn} {retryBtn}
                    </div>
                );
            }

            const errorText = error.error ? `[${error.error}] ${error.msg}` : error.toString();

            return (
                <div className={css.preloaderError}>
                    <div className="alert alert-danger col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        {closeBtn}
                        <h4 className="caalertrd-heading">Ошибка!</h4>
                        {errorText.split('\n').map((str: any, i: any) => <p key={i}>{str}</p>)}
                        {buttonRow}
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
