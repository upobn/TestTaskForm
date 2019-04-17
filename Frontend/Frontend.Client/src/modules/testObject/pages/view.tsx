import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { match, withRouter } from 'react-router';
import { Action } from 'redux';
import { IState } from '../reducers';
import { actions } from '../actions';
import { ITestObject } from '../../../api';
import * as selectors from '../selectors';
import DeleteTestObjectDialog from './delete';
import { connect } from 'react-redux';

interface IStateProps {
    inProgress?: boolean | null;
    error?: string | null;
    item?: ITestObject | null;
}

interface IDispatchProps {
    refresh?: (id: string) => Action;
    clearUploadLogoState?: () => Action;
    clearDeletionState?: () => Action;
}

interface IRouteProps {
    match?: match<{ id: string }>;
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        inProgress: selectors.view(state).inProgress,
        error: selectors.view(state).error,
        item: selectors.view(state).item
    };
};

const mapDispatchToProps: IDispatchProps = {
    refresh: actions.view.fetch.init,
};

interface IViewTestObjectPageState {
    isUploadOpen: boolean;
    isDeleteOpen: boolean;
}

export class ViewTestObjectPage extends React.Component<IStateProps & IDispatchProps & IRouteProps, IViewTestObjectPageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isUploadOpen: false,
            isDeleteOpen: false
        };
        this.openUploadDialog = this.openUploadDialog.bind(this);
        this.closeUploadDialog = this.closeUploadDialog.bind(this);
        this.openDeleteDialog = this.openDeleteDialog.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    }

    componentWillMount() {
        this.refresh();
    }

    refresh = () => {
        if (this.props.refresh && this.props.match) {
            this.props.refresh(this.props.match.params.id);
        }
    };

    render() {
        const id = this.props.match ? parseInt(this.props.match.params.id, undefined) : null;
        const { item = null, error, inProgress } = this.props;
        const { isUploadOpen, isDeleteOpen } = this.state;

        return (
            <ui.PreloaderOverlay inProgress={inProgress} error={error}>
                <ui.PageHeader title="Эммитент" subtitle={` #${id}`} />

                <ui.ToolbarContainer>
                    <ui.Toolbar>
                        <ui.ToolbarLinkButton text="Назад" icon={<fa.ArrowCircleLeft />} to="/testObjects" />
                        <ui.ToolbarLinkButton text="Изменить" icon={<fa.Edit />} to={`/testObjects/${id}/edit`} />
                        <ui.ToolbarButton text="Удалить" icon={<fa.Trash />} onClick={this.openDeleteDialog}
                            type="danger" />
                    </ui.Toolbar>
                </ui.ToolbarContainer>

                {this.renderForm()}

               

            </ui.PreloaderOverlay>
        );
    }

    openUploadDialog() {
        if (this.props.clearUploadLogoState) {
            this.props.clearUploadLogoState();
        }
        this.setState({ isUploadOpen: true });
    }

    closeUploadDialog() {
        this.setState({ isUploadOpen: false });
    }

    openDeleteDialog() {
        if (this.props.clearDeletionState) {
            this.props.clearDeletionState();
        }
        this.setState({ isDeleteOpen: true });
    }

    closeDeleteDialog() {
        this.setState({ isDeleteOpen: false });
    }

    renderForm() {
        const { item } = this.props;
        if (!item) {
            return null;
        }

        return (
            <div className="row">
                <div className="col-sm-3">
                   
                    <button className="btn btn-outline-dark btn-sm mt-2" onClick={this.openUploadDialog} type="button">
                        <fa.FolderOpen />
                        Загрузить логотип...
                    </button>
                </div>
                <div className="col-sm-9">
                    <ui.ViewForm>
                        <ui.ViewFormItem label="ID" value={item.id} />
                        <ui.ViewFormItem label="fieldId1" value={item.fieldId1} />

                        <ui.ViewFormItem label="FieldId2Type" value={item.fieldId2} />
                        
                        <ui.ViewFormItem label="FieldId3" value={item.fieldId3} />
                        {/* <ui.ViewFormItem label="Название (RU)" value={item.nameRu} />
                        <ui.ViewFormItem label="Описание (RU)" value={item.descrRu} />
                        <ui.ViewFormItem label="Название (EN)" value={item.nameEn} />
                        <ui.ViewFormItem label="Описание (EN)" value={item.descrEn} />
                        <ui.ViewFormItem label="Регион" value={item.region} />
                        <ui.ViewFormItem label="Сектор" value={item.sector} />
                        <ui.ViewFormItem label="Код" value={item.code} /> */}

                        {/* <ui.ViewFormItem label="Веб-сайт">
                            <a href={item.websiteUrl as string} target="_blank" className="btn btn-outline-primary">
                                <fa.ExternalLink />
                                {item.websiteUrl}
                            </a> */}

                        {/* </ui.ViewFormItem> */}
                        {/* <ui.ViewFormItem label="Создан" value={item.creationTime} dataType="datetime" /> */}
                        {/* <ui.ViewFormItem label="Последнее изменение" value={item.lastChangeTime} dataType="datetime" /> */}
                    </ui.ViewForm>
                    {/* <UploaderFiles mode={ModeOfUploaderFiles.SingleFile}
                                   openButtonText="Открыть договор аренды"
                                   uploadButtonText="Загрузить договор аренды"
                                   uploaderDialogHeader="Загрузка договора аренды"
                                   acceptedTypes="application/pdf"
                                   openFile={this.openRentalAgreement as IOpenFile}
                                   saveFile={this.saveRentalAgreement}/> */}
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewTestObjectPage) as any);
