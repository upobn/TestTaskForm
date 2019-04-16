import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { match } from 'react-router';
import { Action } from 'redux';
import { IState } from '../reducers';
import { actions } from '../actions';
import { ITestObject, FieldId2Type, FieldId5Type, FieldId2Types, FieldId5Types } from '../../../api';
import * as selectors from '../selectors';
import { connect } from 'react-redux';
import  moment from 'moment';

interface IStateProps {
    inProgress?: boolean | null;
    saveError?: string | null;
    fetchError?: string | null;
    item?: ITestObject | null;
}

interface IDispatchProps {
    fetch?: (id: string) => Action;
    save?: (id: string, item: ITestObject) => Action;
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
    // id: number;
    fieldId1: IInputState<string>,
    fieldId2Type: IInputState<FieldId2Type>,
    fieldId3?: IInputState<moment.Moment>
    fieldId4?: IInputState<boolean>,
    fieldId5: IInputState<FieldId5Type>,
}

export class EditTestObjectPage extends React.Component<IStateProps & IDispatchProps & IRouteProps, IEditUserPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fieldId1: {},
            fieldId2Type: {},
            fieldId3: {},
            fieldId4: {},
            fieldId5: {},
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
            this.state.fieldId1.error //||
            // this.state.nameRu.error ||
            // this.state.descriptionRu.error ||
            // this.state.webSiteUrl.error ||
            // this.state.region.error ||
            // this.state.sector.error ||
            // this.state.code.error ||
            // this.state.descrEn.error ||
            // this.state.nameEn.error
        ) {
            return;
        }

        if (this.props.match) {
            const testObjectId = parseInt(this.props.match.params.id, undefined);
            const testObject: ITestObject = {
                // id: testObjectId,
                fieldId1: this.state.fieldId1.value as string,
                fieldId2Type: this.state.fieldId2Type.value as FieldId2Type,
                fieldId3: this.state.fieldId3 && this.state.fieldId3.value,
                fieldId4: this.state.fieldId4 && this.state.fieldId4.value,
                fieldId5: this.state.fieldId5.value as FieldId5Type,


            };
            if (this.props.save) {
                this.props.save(testObjectId.toString(), testObject);
            }
        }
    }

    componentWillReceiveProps?(nextProps: Readonly<IStateProps & IDispatchProps & IRouteProps>) {
        if (!this.props.item && nextProps.item) {
            this.setState({
                fieldId1: {
                    value: nextProps.item.fieldId1 as string,
                    error: null
                },

                fieldId2Type: {
                    value: nextProps.item.fieldId2Type,
                    error: null
                },
                fieldId3: {
                    value: nextProps.item.fieldId3,
                    error: null
                },
                fieldId4: {
                    value: nextProps.item.fieldId4,
                    error: null
                },

                fieldId5: {
                    value: nextProps.item.fieldId5,
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
                            <ui.ToolbarLinkButton text="Отмена" icon={<fa.Times />} to={`/testObjects/${id}`} />
                        </ui.Toolbar>
                    </ui.ToolbarContainer>

                    <ui.InputFormArea>

                        <ui.InputFormText label="ID" value={id.toString()} readonly={true} />


                        {this.fieldId1Input()}
                        {this.fieldId2TypeInput()}
                        {this.fieldId3Input()}
                        {this.fieldId4Input()}
                        {this.fieldId5Input()}


                    </ui.InputFormArea>
                </ui.PreloaderOverlay>
            </ui.InputForm>
        );
    }

    fieldId1Input() {
        const validate = (value: string) => {
            return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
        }

        const change = (value: string) => {
            const model: IInputState<string> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, fieldId1: model });
        }

        return (
            <ui.InputFormText label="fieldId1" value={this.state.fieldId1.value} validate={validate} change={change} />
        );
    }

    fieldId2TypeInput() {
        const validate = (value: FieldId2Type) => {
            return null;
        }

        const change = (value: FieldId2Type) => {
            const model: IInputState<FieldId2Type> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, fieldId2Type: model });
        }

        return (
            <ui.InputFormSelector label="nbg"
                value={this.state.fieldId2Type.value}
                items={FieldId2Types}
                validate={validate}
                change={change} />
        );
    }

    fieldId3Input() {
        const validate = (value: moment.Moment) => {
            return !(value) ? 'Поле не может быть пустым' : '';
        }

        const change = (value: moment.Moment) => {
            const model: IInputState<moment.Moment> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, fieldId3: model });
        }
        const defaultDate = moment();
        return (
            <ui.InputFormDate label="fieldId3" value={(this.state.fieldId3 && this.state.fieldId3.value) || defaultDate}
                validate={validate} change={change} />
        );
    }
    fieldId5Input() {
        const validate = (value: FieldId5Type) => {
            return null;
        }

        const change = (value: FieldId5Type) => {
            const model: IInputState<FieldId5Type> = {
                value,
                error: validate(value)
            };
            this.setState({ ...this.state, fieldId5: model });
        }

        return (
            <ui.InputFormSelector label="nbg"
                value={this.state.fieldId5.value}
                items={FieldId5Types}
                validate={validate}
                change={change} />
        );
    }

    fieldId4Input() {
        // const validate = (value) => {
        //     return null;
        // }

        const change = (value: boolean) => {
            const model: IInputState<boolean> = {
                value,
                error: null
            };
            this.setState({ ...this.state, fieldId4: model });
        }

        return (
            <ui.InputFormCheckbox label="fieldId3" value={this.state.fieldId4 && this.state.fieldId4.value} change={change} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTestObjectPage)
