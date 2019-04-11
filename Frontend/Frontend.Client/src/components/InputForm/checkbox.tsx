import * as React from 'react';
import cn from 'classnames';
import { IInputFormFieldProps, InputFormFieldWrapper } from './field';

export interface IInputFormCheckboxProps extends IInputFormFieldProps {
    value?: boolean;
    id?: number;
    validate?: (value: boolean) => string;
    change?: (value: boolean) => void;
}

interface IInputFormCheckboxState {
    value: boolean | undefined;
    error: string | undefined;
}

export class InputFormCheckbox extends React.Component<IInputFormCheckboxProps, IInputFormCheckboxState> {
    constructor(props: any) {
        super(props);

        const { value, validate } = props;
        const error = validate && validate(value);

        this.state = { value, error };

        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps: IInputFormCheckboxProps) {
        const { value, validate } = newProps;
        const error = validate && validate(value as boolean);

        this.setState({ ... this.state, value, error });
    }

    componentWillUpdate(nextProps: Readonly<IInputFormCheckboxProps>) {
        if (nextProps !== this.props) {
            const { value, validate } = nextProps;
            const error = validate && validate(value as boolean);

            this.setState({ ... this.state, value, error });
        }
    }

    onChange(e: any) {
        const value = e.target.checked;
        const { validate, change } = this.props;
        const error = validate && validate(value);
        if(change) {
            change(value);
        }
        this.setState({ ... this.state, value, error });
    }

    render() {
        const { label, readonly = false, disabled = false, style, id=0 } = this.props;
        const { value } = this.state;

        const error = this.state.error || this.props.error;

        return (
            <InputFormFieldWrapper error={error} style={style}>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className={cn('custom-control-input', error ? 'is-invalid' : null)} id={`customCheck${id}`} 
                        checked={value}
                        readOnly={readonly}
                        disabled={disabled}
                        onChange={this.onChange} />
                    <span className="custom-control-indicator"/>
                    <label className="custom-control-label" htmlFor={`customCheck${id}`}>{label}</label>
                </div>
            </InputFormFieldWrapper>
        );
    }   
}
