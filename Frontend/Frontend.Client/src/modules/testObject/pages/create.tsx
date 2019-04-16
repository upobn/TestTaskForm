import * as React from 'react';
import * as fa from '../../../components/icons';
import * as ui from '../../../components';
import { Action } from 'redux';
import { IState } from '../reducers';
import { actions } from '../actions';
import { ITestObject, FieldId2Type, FieldId5Type, FieldId2Types, FieldId5Types } from '../../../api';
import * as selectors from '../selectors';
import { connect } from 'react-redux';
import moment from 'moment';

interface IStateProps {
    inProgress?: boolean | null;
    error?: string | null;
}

interface IDispatchProps {
    save: (item: ITestObject) => Action;
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

interface ICreateTestObjectPageState {
    id?: number;
    fieldId1: IInputState<string>,
    fieldId2Type: IInputState<FieldId2Type>,
    fieldId3?: IInputState<moment.Moment>
    fieldId4?: IInputState<boolean>,
    fieldId5: IInputState<FieldId5Type>,


}

export class CreateTestObjectPage extends React.Component<IStateProps & IDispatchProps, ICreateTestObjectPageState> {
    constructor(props: any) {
        super(props);
        this.state = {

            fieldId1: {},
            fieldId2Type: {},
            fieldId3: {},
            fieldId4: {},
            fieldId5: {},


        };

        this.save = this.save.bind(this);
    }

    save = () => {
        // if (this.state.isActive.error ||
        //     this.state.nameRu.error ||
        //     this.state.descriptionRu.error ||
        //     this.state.webSiteUrl.error) {
        //     return;
        // }

        const testObject: ITestObject = {
            // id: 0,

            fieldId1: this.state.fieldId1.value as string,
            fieldId2Type: this.state.fieldId2Type && this.state.fieldId2Type.value as FieldId2Type,
            fieldId3: this.state.fieldId3 && this.state.fieldId3.value,
            fieldId4: this.state.fieldId4 && this.state.fieldId4.value as boolean,
            fieldId5: this.state.fieldId5.value as FieldId5Type,
            // sector: this.state.sector.value as string,
            // code: this.state.code.value as string,
            // descrEn: this.state.descrEn.value as string,
            // nameEn: this.state.nameEn.value as string,

        };
        this.props.save(testObject);
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
                            <ui.ToolbarLinkButton text="Отмена" icon={<fa.Times />} to="/TestObjects" />
                        </ui.Toolbar>
                    </ui.ToolbarContainer>

                    <ui.InputFormArea>

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
export default connect(mapStateToProps, mapDispatchToProps)(CreateTestObjectPage);
