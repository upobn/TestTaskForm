import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { match } from 'react-router';
import { Action } from 'redux';
import { IState } from '../reducers';
import { actions } from '../actions';
import { IIssuer } from '../../../api';
import * as selectors from '../selectors';
import { connect } from 'react-redux';

interface IStateProps {
    inProgress?: boolean | null;
    saveError?: string | null;
    fetchError?: string | null;
    item?: IIssuer | null;
}

interface IDispatchProps {
    fetch?: (id: string) => Action;
    save?: (id: string, item: IIssuer) => Action;
}

interface IRouteProps {
    match: match<{ id: string }>;
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        inProgress: selectors.edit(state).inProgress,
        fetchError: selectors.edit(state).fetchError,
        saveError: selectors.edit(state).saveError,
        item: selectors.edit(state).item
    };
};

const mapDispatchToProps: IDispatchProps = {
    fetch: actions.edit.fetch.init,
    save: actions.edit.save.init
};

interface IInputState<T> {
    value?: T;
    error?: string | null;
}

interface IEditUserPageState {
    isActive: IInputState<boolean>;
    nameRu: IInputState<string>;
    descriptionRu: IInputState<string>;
    webSiteUrl: IInputState<string>;
    region: IInputState<string>;
    sector: IInputState<string>;
    code: IInputState<string>;
    descrEn: IInputState<string>;
    nameEn: IInputState<string>;
}

export class EditIssuerPage extends React.Component<IStateProps & IDispatchProps & IRouteProps, IEditUserPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isActive: {},
            nameRu: {},
            descriptionRu: {},
            webSiteUrl: {},
            region: {},
            sector: {},
            code: {},
            descrEn: {},
            nameEn: {},
        }
    }

    componentWillMount() {
        if (this.props.match) {
            const id: string = (this.props.match && this.props.match.params.id) || '';
            if (this.props.fetch) {
                this.props.fetch(id);
            }
        }
    }

    save = () => {
        if (
            this.state.isActive.error ||
            this.state.nameRu.error ||
            this.state.descriptionRu.error ||
            this.state.webSiteUrl.error ||
            this.state.region.error ||
            this.state.sector.error ||
            this.state.code.error ||
            this.state.descrEn.error ||
            this.state.nameEn.error
        ) {
            return;
        }

        if (this.props.match) {
            const issuerId = parseInt(this.props.match.params.id, undefined);
            const issuer: IIssuer = {
                id: issuerId,
                isActive: this.state.isActive.value as boolean,
                nameRu: this.state.nameRu.value as string,
                descrRu: this.state.descriptionRu.value as string,
                websiteUrl: this.state.webSiteUrl.value as string,
                region: this.state.region.value as string,
                sector: this.state.sector.value as string,
                code: this.state.code.value as string,
                descrEn: this.state.descrEn.value as string,
                nameEn: this.state.nameEn.value as string,

            };
            if (this.props.save) {
                this.props.save(issuerId.toString(), issuer);
            }
        }
    }

    componentWillReceiveProps?(nextProps: Readonly<IStateProps & IDispatchProps & IRouteProps>) {
        if (!this.props.item && nextProps.item) {
            this.setState({
                isActive: {
                    value: nextProps.item.isActive,
                    error: null
                },
                nameRu: {
                    value: nextProps.item.nameRu as string,
                    error: null
                },
                descriptionRu: {
                    value: nextProps.item.descrRu as string,
                    error: null
                },
                webSiteUrl: {
                    value: nextProps.item.websiteUrl as string,
                    error: null
                },

                region: {
                    value: nextProps.item.region as string,
                    error: null
                },
                sector: {
                    value: nextProps.item.sector as string,
                    error: null
                },
                code: {
                    value: nextProps.item.code as string,
                    error: null
                },
                descrEn: {
                    value: nextProps.item.descrEn as string,
                    error: null
                },
                nameEn: {
                    value: nextProps.item.nameEn as string,
                    error: null
                },

            });
        }
    }

    render() {
        const id: string = (this.props.match && this.props.match.params.id) || '';
        const { fetchError, saveError, inProgress } = this.props;

        return (
            <ui.InputForm onSubmit={this.save}>
                <ui.PreloaderOverlay inProgress={inProgress} error={saveError || fetchError}>
                    <ui.PageHeader title="Эммитент" subtitle={`#${id}`} />

                    <ui.ToolbarContainer>
                        <ui.Toolbar>
                            <ui.ToolbarSubmitButton text="ОК" icon={<fa.Check />} />
                            <ui.ToolbarSeparator />
                            <ui.ToolbarLinkButton text="Отмена" icon={<fa.Times />} to={`/issuers/${id}`} />
                        </ui.Toolbar>
                    </ui.ToolbarContainer>

                    <ui.InputFormArea>

                        <ui.InputFormText label="ID" value={id.toString()} readonly={true} />

                        {this.isActiveInput()}
                        {this.nameRuInput()}
                        {this.descriptionRuInput()}
                        {this.nameEnInput()}
                        {this.descrEnInput()}
                        {this.webSiteInput()}
                        {this.regionInput()}
                        {this.sectorInput()}
                        {this.codeInput()}

                    </ui.InputFormArea>
                </ui.PreloaderOverlay>
            </ui.InputForm>
        );
    }

    nameEnInput() {
        const validate = (value: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, nameEn: model });
        }

        return (
            <ui.InputFormText label="Название (EN)" value={this.state.nameEn.value} validate={validate} change={change} />
        );
    }

    descrEnInput() {
        const validate = (value: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, descrEn: model });
        }

        return (
            <ui.InputFormText label="Описание (EN)" value={this.state.descrEn.value} validate={validate} change={change} />
        );
    }

    codeInput() {
        const validate = (value: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, code: model });
        }

        return (
            <ui.InputFormText label="Код" value={this.state.code.value} validate={validate} change={change} />
        );
    }

    sectorInput() {
        const validate = (value: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, sector: model });
        }

        return (
            <ui.InputFormText label="Сектор" value={this.state.sector.value} validate={validate} change={change} />
        );
    }

    regionInput() {
        const validate = (value: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, region: model });
        }

        return (
            <ui.InputFormText label="Регион" value={this.state.region.value} validate={validate} change={change} />
        );
    }

    isActiveInput() {
        // const validate = (value) => {
        //     return null;
        // }

        const change = (value: boolean) => {
            const model: IInputState<boolean> = {
                value,
                error: null
            };
            this.setState({ ...this.state, isActive: model });
        }

        return (
            <ui.InputFormCheckbox label="Активен" value={this.state.isActive.value} change={change} />
        );
    }

    nameRuInput() {
        const validate = (value: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, nameRu: model });
        }

        return (
            <ui.InputFormText label="Название (RU)" value={this.state.nameRu.value} validate={validate} change={change} />
        );
    }

    descriptionRuInput() {
        const validate = (value?: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, descriptionRu: model });
        }

        return (
            <ui.InputFormText label="Описание (RU)" value={this.state.descriptionRu.value} validate={validate} change={change} />
        );
    }

    webSiteInput() {
        const validate = (value: string) => {
            value = value && value.trim()
            if (!value) {
                return 'Поле не может быть пустым';
            }

            try {
                const url = new URL(value);
                if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                    return 'Укажите URL с протоколом http/https';
                }
                return null;
            } catch {
                return 'Неправильный URL';
            }
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, webSiteUrl: model });
        }

        return (
            <ui.InputFormText label="Веб-сайт" value={this.state.webSiteUrl.value} validate={validate} change={change} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditIssuerPage)
