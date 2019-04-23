import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { Action } from 'redux';
import { IState } from '../reducers';
import { ITestObject } from '../../../api';

import { actions } from '../actions';
import * as selectors from '../selectors';
import * as H from 'history';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const PAGE_SIZE = 10;

interface IStateProps {
    inProgress?: boolean | null;
    error?: string | null;
    items: ITestObject[];
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

type ITestObjectsPageProps = IStateProps & IDispatchProps & IRouterProps;

interface ITestObjectsPageState {
    uploadTestObject: ITestObject | null;
    deleteTestObject: ITestObject | null;
}

export class TestObjectTablePage extends React.Component<ITestObjectsPageProps, ITestObjectsPageState> {
    private model: ui.IDataGridModel;

    constructor(props: any) {
        super(props);
        this.state = {
            uploadTestObject: null,
            deleteTestObject: null
        };

        this.model = {
            columns: [
                ui.DataGrid.column<ITestObject>('#', x => x.id ? x.id.toString() : null, true),
                ui.DataGrid.column<ITestObject>('fieldId1 ', x => x.fieldId1),
                ui.DataGrid.column<ITestObject>('fieldId2', x => x.fieldId2),
                ui.DataGrid.column<ITestObject>('fieldId3', x => x.fieldId3 as any),
                ui.DataGrid.column<ITestObject>('fieldId4', x => x.fieldId4 ? '+' : '-'),
                ui.DataGrid.column<ITestObject>('fieldId5', x => x.fieldId5),

            ],
            actions: [
                ui.DataGrid.action<ITestObject>('Просмотр', <fa.Eye />, (item) => { this.openViewPage(item); }),
                ui.DataGrid.action<ITestObject>('Изменить testObjectа', <fa.Edit />, (item) => { this.openEditPage(item); }),
                ui.DataGrid.action<ITestObject>('Удалить testObjectа', <fa.Trash />, (item) => this.openDeleteDialog(item), 'danger'),
            ],
            // rowClass: (item: ITestObject) => item.isActive ? null : 'index-secondary',
            rowLink: (item: ITestObject) => `/testObjects/${item.id}`,
            actionMode: 'both'
        };
    }

    componentWillMount() {
        this.refresh();
    }

    componentDidUpdate(prevProps: Readonly<ITestObjectsPageProps>) {
        const { page: currentPage, pageSize: currentPageSize } = this.readQueryParams(prevProps);
        const { page: newPage, pageSize: newPageSize } = this.readQueryParams(this.props);

        // const hasRefreshFlag = !!this.props.location.query.refresh;
        // if(hasRefreshFlag) {
        //     this.props.history.replace('/testObjects');
        // }

        if (currentPage !== newPage || currentPageSize !== newPageSize) {
            this.refresh();
        }
    }

    openViewPage(testObject: ITestObject) {
        this.props.history.push(`/testObjects/${testObject.id}`);
    }

    openEditPage(testObject: ITestObject) {
        this.props.history.push(`/testObjects/${testObject.id}/edit`);
    }

    openUploadLogoDialog(testObject: ITestObject) {
        this.setState({ ...this.state, uploadTestObject: testObject });
    }

    closeUploadLogoDialog() {
        this.setState({ ...this.state, uploadTestObject: null });
    }

    openDeleteDialog(testObject: ITestObject) {
        this.setState({ ...this.state, deleteTestObject: testObject });
        if (this.props.clearDeletionState) { this.props.clearDeletionState() };
    }

    closeDeleteDialog() {
        this.setState({ ...this.state, deleteTestObject: null });
    }

    refresh() {
        const { page, pageSize } = this.readQueryParams(this.props);
        if (this.props.fetch) {
            this.props.fetch(page, pageSize);
        }
    }

    readQueryParams(props: ITestObjectsPageProps): { page: number, pageSize: number } {
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
                ? `/testObjects?page=${p + 1}`
                : `/testObjects?page=${p + 1}&pageSize=${ps}`
            this.props.history.push(url);
            if (this.props.fetch) { this.props.fetch(p, ps); }
        };

        return (
            <div>
                <ui.PageHeader title="testObjectы" />

                <ui.PreloaderOverlay inProgress={inProgress} error={error} retry={refresh}>

                    <ui.ToolbarContainer>
                        <ui.Toolbar>
                            <ui.ToolbarLinkButton text="Создать" icon={<fa.Plus />} to="/testObjects/new" />
                            <ui.ToolbarButton text="Обновить" icon={<fa.Refresh />} onClick={refresh} hotkey="Ctrl+R" />
                        </ui.Toolbar>
                        <ui.Toolbar>
                            <ui.ToolbarPagination page={page} pageSize={pageSize} totalCount={totalCount} onNavigate={navigate} />
                        </ui.Toolbar>
                    </ui.ToolbarContainer>

                    <ui.DataGrid model={this.model} data={items} />

                    {/* <UploadLogoDialog
                        id={this.state.uploadTestObject ? this.state.uploadTestObject.id : null}
                        name={this.state.uploadTestObject ? this.state.uploadTestObject.nameRu : null}
                        isOpen={this.state.uploadTestObject != null}
                        onClosed={this.closeUploadLogoDialog} /> */}
                    {/* 
                    
                    <DeleteTestObjectDialog
                        id={this.state.deleteTestObject ? this.state.deleteTestObject.id : null}
                        name={this.state.deleteTestObject ?  this.state.deleteTestObject.nameRu : null}
                        isOpen={this.state.deleteTestObject != null}
                        onClosed={this.closeDeleteDialog}
                    /> */}

                </ui.PreloaderOverlay>
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestObjectTablePage) as any);
