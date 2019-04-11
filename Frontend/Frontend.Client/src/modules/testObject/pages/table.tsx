import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { Action } from 'redux';
import { IState } from '../reducers';
import { IIssuer } from '../../../api';

import { actions } from '../actions';
import * as selectors from '../selectors';
import * as H from 'history';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const PAGE_SIZE = 10;

interface IStateProps {
    inProgress?: boolean | null;
    error?: string | null;
    items: IIssuer[];
    page: number;
    pageSize: number;
    totalCount: number;
}

interface IDispatchProps {
    fetch?: (page: number, pageSize: number) => Action;
    clearUploadLogoState?: () => Action;
    clearDeletionState?: () => Action;
}

interface IRouterProps {
    history: H.History;
    location: H.Location & {
        query: {
            page?: number;
            pageSize?: number;
            refresh?: boolean;
        }
    };
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        inProgress: selectors.table(state).inProgress,
        error: selectors.table(state).error,
        items: selectors.table(state).items,
        page: selectors.table(state).page,
        pageSize: selectors.table(state).pageSize,
        totalCount: selectors.table(state).totalCount,
    };
};

const mapDispatchToProps: IDispatchProps = {
    fetch: actions.table.fetch.init
};

type IIssuersPageProps = IStateProps & IDispatchProps & IRouterProps;

interface IIssuersPageState {
    uploadIssuer: IIssuer | null;
    deleteIssuer: IIssuer | null;
}

export class IssuerTablePage extends React.Component<IIssuersPageProps, IIssuersPageState> {
    private model: ui.IDataGridModel;

    constructor(props: any) {
        super(props);
        this.state = {
            uploadIssuer: null,
            deleteIssuer: null
        };

        this.model = {
            columns: [
                ui.DataGrid.column<IIssuer>('#', x => x.id ? x.id.toString() : null, true),
                ui.DataGrid.column<IIssuer>('Активен', x => x.isActive ? (<fa.CheckSquareO />) : (<fa.SquareO />)),
                ui.DataGrid.column<IIssuer>('Название (RU)', x => x.nameRu),
                ui.DataGrid.column<IIssuer>('Описание (RU)', x => x.descrRu),
                ui.DataGrid.column<IIssuer>('Название (EN)', x => x.nameEn),
                ui.DataGrid.column<IIssuer>('Описание (EN)', x => x.descrEn),
                ui.DataGrid.column<IIssuer>('Код', x => x.code),
                ui.DataGrid.column<IIssuer>('Регион', x => x.region),
                ui.DataGrid.column<IIssuer>('Сектор', x => x.sector),

            ],
            actions: [
                ui.DataGrid.action<IIssuer>('Просмотр', <fa.Eye />, (item) => { this.openViewPage(item); }),
                ui.DataGrid.action<IIssuer>('Изменить эммитента', <fa.Edit />, (item) => { this.openEditPage(item); }),
                ui.DataGrid.action<IIssuer>('Загрузить новый логотип', <fa.FolderOpen />, (item) => this.openUploadLogoDialog(item)),
                ui.DataGrid.action<IIssuer>('Удалить эммитента', <fa.Trash />, (item) => this.openDeleteDialog(item), 'danger'),
            ],
            rowClass: (item: IIssuer) => item.isActive ? null : 'index-secondary',
            rowLink: (item: IIssuer) => `/issuers/${item.id}`,
            actionMode: 'both'
        };
    }

    componentWillMount() {
        this.refresh();
    }

    componentDidUpdate(prevProps: Readonly<IIssuersPageProps>) {
        const { page: currentPage, pageSize: currentPageSize } = this.readQueryParams(prevProps);
        const { page: newPage, pageSize: newPageSize } = this.readQueryParams(this.props);

        // const hasRefreshFlag = !!this.props.location.query.refresh;
        // if(hasRefreshFlag) {
        //     this.props.history.replace('/issuers');
        // }

        if (currentPage !== newPage || currentPageSize !== newPageSize) {
            this.refresh();
        }
    }

    openViewPage(issuer: IIssuer) {
        this.props.history.push(`/issuers/${issuer.id}`);
    }

    openEditPage(issuer: IIssuer) {
        this.props.history.push(`/issuers/${issuer.id}/edit`);
    }

    openUploadLogoDialog(issuer: IIssuer) {
        this.setState({ ...this.state, uploadIssuer: issuer });
    }

    closeUploadLogoDialog() {
        this.setState({ ...this.state, uploadIssuer: null });
    }

    openDeleteDialog(issuer: IIssuer) {
        this.setState({ ...this.state, deleteIssuer: issuer });
        if (this.props.clearDeletionState) { this.props.clearDeletionState() };
    }

    closeDeleteDialog() {
        this.setState({ ...this.state, deleteIssuer: null });
    }

    refresh() {
        const { page, pageSize } = this.readQueryParams(this.props);
        if (this.props.fetch) { 
            this.props.fetch(page, pageSize);
         }
    }

    readQueryParams(props: IIssuersPageProps): { page: number, pageSize: number } {
        const query = props.location && props.location.query;
        let page = 0;
        let pageSize = PAGE_SIZE
        if (query) {
            page = ((query.page && parseInt(query.page.toString(), undefined)) || 1) - 1;
            pageSize = (query.pageSize && parseInt(query.pageSize.toString(), undefined)) || PAGE_SIZE;
            return { page, pageSize };
        }

        return { page, pageSize };
    }

    render() {

        const { error, inProgress, items, page, pageSize, totalCount } = this.props;

        const refresh = () => this.refresh();

        const navigate = (p: number, ps?: number) => {
            ps = ps || PAGE_SIZE
            const url = ps === PAGE_SIZE
                ? `/issuers?page=${p + 1}`
                : `/issuers?page=${p + 1}&pageSize=${ps}`
            this.props.history.push(url);
            if (this.props.fetch) { this.props.fetch(p, ps); }
        };

        return (
            <div>
                <ui.PageHeader title="Эммитенты" />

                <ui.PreloaderOverlay inProgress={inProgress} error={error} retry={refresh}>

                    <ui.ToolbarContainer>
                        <ui.Toolbar>
                            <ui.ToolbarLinkButton text="Создать" icon={<fa.Plus />} to="/issuers/new" />
                            <ui.ToolbarButton text="Обновить" icon={<fa.Refresh />} onClick={refresh} hotkey="Ctrl+R" />
                        </ui.Toolbar>
                        <ui.Toolbar>
                            <ui.ToolbarPagination page={page} pageSize={pageSize} totalCount={totalCount} onNavigate={navigate} />
                        </ui.Toolbar>
                    </ui.ToolbarContainer>

                    <ui.DataGrid model={this.model} data={items} />

                    {/* <UploadLogoDialog
                        id={this.state.uploadIssuer ? this.state.uploadIssuer.id : null}
                        name={this.state.uploadIssuer ? this.state.uploadIssuer.nameRu : null}
                        isOpen={this.state.uploadIssuer != null}
                        onClosed={this.closeUploadLogoDialog} /> */}
                    {/* 
                    
                    <DeleteIssuerDialog
                        id={this.state.deleteIssuer ? this.state.deleteIssuer.id : null}
                        name={this.state.deleteIssuer ?  this.state.deleteIssuer.nameRu : null}
                        isOpen={this.state.deleteIssuer != null}
                        onClosed={this.closeDeleteDialog}
                    /> */}

                </ui.PreloaderOverlay>
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IssuerTablePage) as any);
