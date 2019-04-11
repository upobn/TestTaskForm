import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { Action } from 'redux';
import { IState } from '../reducers';
import { actions } from '../actions';
import * as selectors from '../selectors';
import { connect } from 'react-redux';

interface IStateProps {
    inProgress?: boolean | null;
    error?: string | null;
    deleted?: boolean;
}

interface IDispatchProps {
    delete?: (id: number) => Action;
}

interface IOwnProps {
    id: number | null;
    name: string | null;
    isOpen: boolean;
    onClosed: () => void;
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        inProgress: selectors.del(state).inProgress,
        error: selectors.del(state).error,
        deleted: selectors.del(state).deleted
    };
};

const mapDispatchToProps: IDispatchProps = {
    delete: actions.delete.init
};

export default class DeleteIssuerDialog extends React.Component<IStateProps & IDispatchProps & IOwnProps> {
    componentDidUpdate?(prevProps: any, prevState: any, prevContext: any) {
        if (prevProps && !prevProps.deleted && this.props.deleted) {
            this.props.onClosed();
        }
    }

    render() {
        const { id, name, isOpen, inProgress, error, deleted } = this.props;

        let body;
        if (!deleted) {
            const errorView = error ? (
                <p className="alert alert-danger">{error}</p>
            ) : null;
            body = (
                <ui.ModalPreloaderOverlay inProgress={inProgress}>
                    <ui.ModalHeader title="Удаление эммитента'" />
                    <ui.ModalBody>
                        <p>
                            Подтвердите удаление эммитента <samp>#{id}</samp> {name}
                        </p>
                        {errorView}
                    </ui.ModalBody>
                    <ui.ModalFooter>
                        <ui.ModalButton text="Удалить" action="submit" className="btn-danger" icon={<fa.Trash />} />
                        <ui.ModalButton text="Отмена" action="dismiss" icon={<fa.Times />} />
                    </ui.ModalFooter>
                </ui.ModalPreloaderOverlay>
            );
        } else {
            body = (
                <ui.ModalPreloaderOverlay inProgress={inProgress}>
                    <ui.ModalHeader title="Удаление эмитента" />
                    <ui.ModalBody>
                        <strong>Готово!</strong>
                        <p>
                            Эммитент <samp>#{id}</samp> {name} был удален
                        </p>
                    </ui.ModalBody>
                    <ui.ModalFooter>
                        <ui.ModalButton text="OK" action="dismiss" className="btn-primary" icon={<fa.Check />} />
                    </ui.ModalFooter>
                </ui.ModalPreloaderOverlay>
            );
        }

        const deleteSubmit = () => {
            if (this.props.delete && this.props.id) {
                this.props.delete(this.props.id);
            }
        }

        return (
            <ui.Modal name="DeleteIssuerDialog" isOpen={isOpen} onClosed={this.props.onClosed}>
                <ui.ModalDialog onSubmit={deleteSubmit} >
                    {body}
                </ui.ModalDialog>
            </ui.Modal >
        );
    }
}

connect(mapStateToProps, mapDispatchToProps)(DeleteIssuerDialog);