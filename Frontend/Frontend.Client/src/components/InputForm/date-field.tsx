import * as React from 'react';
import cn from 'classnames';
import { IInputFormFieldProps, InputFormFieldWrapper } from './field';
import moment, { Moment } from 'moment';
import { default as DatePicker } from 'react-datepicker'

export interface IInputFormDateProps extends IInputFormFieldProps {
    value: moment.Moment;
    validate?: (value: moment.Moment) => string;
    change?: (value: moment.Moment) => void;
}

interface IInputFormDateState {
    value: moment.Moment;
    error: string | null;
}

export class InputFormDate extends React.Component<IInputFormDateProps, IInputFormDateState> {
    public static Required: (value: string) => string | null = (value: string): string | null => {
        return !(value && value.trim()) ? 'Поле не может быть пустым' : null;
    };

    constructor(props: IInputFormDateProps) {
        super(props);

        const { value = moment(), validate = null } = props;
        const error = validate && validate(value as moment.Moment);

        this.state = { value, error };
    }

    componentWillReceiveProps(newProps: IInputFormDateProps) {
        const { value, validate = null } = newProps;
        const error = validate && validate(value);

        this.setState({ ... this.state, value, error });
    }

    componentWillUpdate(nextProps: Readonly<IInputFormDateProps>) {
        if (nextProps !== this.props) {
            const { value, validate = null } = nextProps;
            const error = validate && validate(value);

            this.setState({ ... this.state, value, error });
        }
    }
    render() {
        const { label, readonly = false, disabled = false, style } = this.props;
        const { value } = this.state;
        const error = this.state.error || this.props.error;
      
        return (
            <InputFormFieldWrapper label={label} error={error} style={style}>
                <DatePicker
                    className={cn('form-control', error ? 'is-invalid' : null)}
                    dateFormat="dd MMM YYYY"
                    readOnly={false}
                    disabled={disabled}
                    selected={moment(value).toDate()}
                    onChange={this.onChange} />
            </InputFormFieldWrapper>
        );
    }

    onChange = (e: any) => {

        const value = e;

        const { validate = null, change = null } = this.props;
        const error = validate && validate(value);
        if (change) {
            change(value);
        }
        this.setState({ ... this.state, value, error });
    }
}
