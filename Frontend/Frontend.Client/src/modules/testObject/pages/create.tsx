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
 import { MDBContainer, MDBInput } from 'mdbreact';

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
    fieldId2: IInputState<FieldId2Type>,
    fieldId3?: IInputState<moment.Moment>
    fieldId4?: IInputState<boolean>,
    fieldId5: IInputState<FieldId5Type>,


}

export class CreateTestObjectPage extends React.Component<IStateProps & IDispatchProps, ICreateTestObjectPageState> {
    constructor(props: any) {
        super(props);
        this.state = {

            fieldId1:     {
                value: '',
                error: null
            },  
            fieldId2:  {
                value: FieldId2Type.Type1,
                error: null
            },  
            fieldId3: {
                value: moment(),
                error: null
            },  
            fieldId4: {
                value: false,
                error: null
            },  
            fieldId5:  {
                value: FieldId5Type.Radio1,
                error: null
            },  
        };

        this.save = this.save.bind(this);
    }

    save = () => {
        if (this.state.fieldId1.error ||
            this.state.fieldId2.error ||
            (this.state.fieldId3 && this.state.fieldId3.error) ||
            (this.state.fieldId4 && this.state.fieldId4.error) ||
            this.state.fieldId5.error ||
             !this.state.fieldId1.value) {
            return;
        }

        const testObject: ITestObject = {
            // id: 0,

            fieldId1: this.state.fieldId1.value as string,
            fieldId2: this.state.fieldId2.value as FieldId2Type,
            fieldId3: this.state.fieldId3 && this.state.fieldId3.value,
            fieldId4: this.state.fieldId4 && this.state.fieldId4.value as boolean,
            fieldId5: this.state.fieldId5.value as FieldId5Type,


        };
        this.props.save(testObject);
    }

    render() {
        const { error, inProgress, clearError } = this.props;

        return (
            <ui.InputForm onSubmit={this.save}>
                <ui.PreloaderOverlay inProgress={inProgress} error={error} dismissError={clearError}>
                    <ui.PageHeader title="Новый testObject" />

                    <ui.ToolbarContainer>
                        <ui.Toolbar>
                            <ui.ToolbarSubmitButton text="ОК" icon={<fa.Check />} />
                            <ui.ToolbarLinkButton text="Отмена" icon={<fa.Times />} to="/TestObjects" />
                        </ui.Toolbar>
                    </ui.ToolbarContainer>

                    <ui.InputFormArea>

                        {this.fieldId1Input()}
                        {this.fieldId2Input()}
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

    fieldId2Input() {
        const onClick = (value: any) => () => {
            const model: IInputState<FieldId2Type> = {
                value,
                error: null
            };
            this.setState({
                ...this.state, fieldId2: model
            });
        }

        return (
            < MDBContainer >
                <MDBInput
                    label={FieldId2Type.Type1} type="radio"
                    checked={this.state.fieldId2.value === FieldId2Type.Type1}
                    onClick={onClick(FieldId2Type.Type1)}
                />
                <MDBInput
                    label={FieldId2Type.Type2} type="radio"
                    checked={this.state.fieldId2.value === FieldId2Type.Type2}
                    onClick={onClick(FieldId2Type.Type2)}
                />
            </MDBContainer >
        );
    }

    fieldId3Input() {
        const validate = (value: moment.Moment) => {
            return !(value) ? 'Поле не может быть пустым' : '';
        }

        const change = (value: moment.Moment) => {
            const val = (value || moment()) as moment.Moment
            const model: IInputState<moment.Moment> = {
                value: val,
                error: validate(value)
            };
            this.setState({ ...this.state, fieldId3: model });
        }

        return (
            <ui.InputFormDate label="fieldId3" value={(this.state.fieldId3 && this.state.fieldId3.value) || moment()}
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
