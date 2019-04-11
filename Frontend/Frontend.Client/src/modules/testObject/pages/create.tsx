import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { Action } from 'redux';
import { IState } from '../reducers';
import { actions } from '../actions';
import { IIssuer } from '../../../api';
import * as selectors from '../selectors';
import { connect } from 'react-redux';

interface IStateProps {
    inProgress?: boolean | null;
    error?: string | null;
}

interface IDispatchProps {
    save: (item: IIssuer) => Action;
    clearError?: () => Action;
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        inProgress: selectors.create(state).inProgress,
        error: selectors.create(state).error
    };
};

const mapDispatchToProps: IDispatchProps = {
    save: actions.create.save.init
};

interface IInputState<T> {
    value?: T;
    error?: string | null;
}

interface ICreateIssuerPageState {
    isActive: IInputState<boolean>,
    nameRu: IInputState<string>,

    descriptionRu: IInputState<string>,
    webSiteUrl: IInputState<string>,

    region: IInputState<string>,
    sector: IInputState<string>,
    code: IInputState<string>,
    descrEn: IInputState<string>,
    nameEn: IInputState<string>,
}

export class CreateIssuerPage extends React.Component<IStateProps & IDispatchProps, ICreateIssuerPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isActive: {
                value: false,
                error: null
            },
            nameRu: {
                value: "",
                error: null
            },
            descriptionRu: {
                value: "",
                error: null
            },
            webSiteUrl: {
                value: "",
                error: null
            },

            region: {
                value: "",
                error: null
            },
            sector: {
                value: "",
                error: null
            },
            code: {
                value: "",
                error: null
            },
            descrEn: {
                value: "",
                error: null
            },
            nameEn: {
                value: "",
                error: null
            },


        };

        this.save = this.save.bind(this);
    }

    save = () => {
        if (this.state.isActive.error ||
            this.state.nameRu.error ||
            this.state.descriptionRu.error ||
            this.state.webSiteUrl.error) {
            return;
        }

        const issuer: IIssuer = {
            id: 0,
            isActive: this.state.isActive.value,
            nameRu: this.state.nameRu.value as string,
            descrRu: this.state.descriptionRu.value as string,
            websiteUrl: this.state.webSiteUrl.value as string,
            region: this.state.region.value as string,
            sector: this.state.sector.value as string,
            code: this.state.code.value as string,
            descrEn: this.state.descrEn.value as string,
            nameEn: this.state.nameEn.value as string,

        };
        this.props.save(issuer);
    }

    render() {
        const { error, inProgress, clearError } = this.props;

        return (
            <ui.InputForm onSubmit={this.save}>
                <ui.PreloaderOverlay inProgress={inProgress} error={error} dismissError={clearError}>
                    <ui.PageHeader title="Новый эммитент" />

                    <ui.ToolbarContainer>
                        <ui.Toolbar>
                            <ui.ToolbarSubmitButton text="ОК" icon={<fa.Check />} />
                            <ui.ToolbarLinkButton text="Отмена" icon={<fa.Times />} to="/Issuers" />
                        </ui.Toolbar>
                    </ui.ToolbarContainer>

                    <ui.InputFormArea>

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
        const validate = (value: boolean) => {
            return '';
        }

        const change = (value: boolean) => {
            const model: IInputState<boolean> = {
                value,
                error: undefined
            };
            this.setState({ ...this.state, isActive: model });
        }

        return (
            <ui.InputFormCheckbox label="Активен" value={this.state.isActive.value} change={change} validate={validate} />
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
        const validate = (value: string) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateIssuerPage);