import * as React from 'react';
import cn from 'classnames';
import * as ui from '../../../components';
import * as fa from '../../../components/icons';
import { IState } from '../reducers';
import { actions } from '../actions';
import * as selectors from '../selectors';
import { Action } from 'redux';
import { connect } from 'react-redux';


interface IStateProps {
    inProgress?: boolean | null;
    error?: string | null;
    completed?: boolean | null;
}

interface IDispatchProps {
    upload?: (id: number, file: Blob) => Action;
}

interface IOwnProps {
    id: number | null;
    name: string | null;
    isOpen: boolean;
    onClosed: () => void;
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        inProgress: selectors.logo(state).inProgress,
        error: selectors.logo(state).error,
        completed: selectors.logo(state).completed
    };
};

const mapDispatchToProps: IDispatchProps = {
    upload: actions.logo.upload.init
};

interface IUploadLogoDialogState {
    error: string | null;
}

export class UploadLogoDialog extends React.Component<IStateProps & IDispatchProps & IOwnProps, IUploadLogoDialogState> {
    private inputRef: any = null;

    constructor(props: any) {
        super(props);
        this.state = { error: null };

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onRef = this.onRef.bind(this);
        this.onClosed = this.onClosed.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate?(prevProps: any, prevState: any, prevContext: any) {
        if (prevProps && !prevProps.completed && this.props.completed) {
            this.props.onClosed();
        }
    }

    onSubmit = () => {
        const input = this.inputRef;
        const files = input.files;
        if (files && files.length > 0 && this.props.upload && this.props.id) {
            this.props.upload(this.props.id, files[0]);
            this.setState({ ...this.state, error: null });
        } else {
            this.setState({ ...this.state, error: 'Выберите файл' });
        }
    };

    onInputChange = () => {
        const input = this.inputRef;
        const files = input.files;
        if (files && files.length > 0) {
            this.setState({ ...this.state, error: null });
        } else {
            this.setState({ ...this.state, error: 'Выберите файл' });
        }
    };

    onRef = (ref: any) => {
        this.inputRef = ref;
    };

    onClosed = () => {
        this.props.onClosed();
    };

    render() {
        const { name, isOpen, inProgress, error, completed } = this.props;

        let body;
        if (!completed) {
            const errorView = error ? (
                <p className="alert alert-danger">{error}</p>
            ) : null;
            body = (
                <ui.ModalPreloaderOverlay inProgress={inProgress}>
                    <ui.ModalHeader title={`Загрузить логотип для ${name}`} />
                    <ui.ModalBody>
                        <div className="form-group">
                            <label>Выберите файл</label>
                            <input type="file" className={cn('form-control', this.state.error ? 'is-invalid' : null)} ref={this.onRef} onChange={this.onInputChange} />
                            <div className="invalid-feedback">{this.state.error}</div>
                        </div>
                        {errorView}
                    </ui.ModalBody>
                    <ui.ModalFooter>
                        <ui.ModalButton text="Загрузить" action="submit" icon={<fa.Check />} />
                        <ui.ModalButton text="Отмена" action="dismiss" icon={<fa.Times />} />
                    </ui.ModalFooter>
                </ui.ModalPreloaderOverlay>
            );
        } else {
            body = (
                <ui.ModalPreloaderOverlay inProgress={inProgress}>
                    <ui.ModalHeader title={`Загрузить логотип для ${name}`} />
                    <ui.ModalBody>
                        <strong>Готово!</strong>
                        <p>
                            Загрузка выполнена успешно
                        </p>
                    </ui.ModalBody>
                    <ui.ModalFooter>
                        <ui.ModalButton text="OK" action="dismiss" className="btn-primary" icon={<fa.Check />} />
                    </ui.ModalFooter>
                </ui.ModalPreloaderOverlay>
            );
        }

        return (
            <ui.Modal name="UploadLogoDialog" isOpen={isOpen} onClosed={this.onClosed}>
                <ui.ModalDialog onSubmit={this.onSubmit} >
                    {body}
                </ui.ModalDialog>
            </ui.Modal>
        );
    }
}

export default connect<{}, {}, IOwnProps, IState>(mapStateToProps, mapDispatchToProps)(UploadLogoDialog);