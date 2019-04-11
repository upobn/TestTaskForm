import * as React from 'react';
import cn from 'classnames';
import { IInputFormFieldProps, InputFormFieldWrapper } from './field';

export interface IInputFormPasswordProps extends IInputFormFieldProps {
    value: string;

    validate?: (value: string) => string;
    change?: (value: string) => void;
}

interface IInputFormTextState {
    value: string;
    error: string | null;
}

export class InputFormPassword extends React.Component<IInputFormPasswordProps, IInputFormTextState> {
    constructor(props: any) {
        super(props);

        const { value, validate = null } = props;
        const error = validate && validate(value);

        this.state = { value, error };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps: IInputFormPasswordProps) {
        const { value, validate = null } = newProps;
        const error = validate && validate(value);

        this.setState({ ... this.state, value, error });
    }

    componentWillUpdate(nextProps: Readonly<IInputFormPasswordProps>) {
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
                <input
                    type="password"
                    autoComplete="none"
                    className={cn('form-control', error ? 'is-invalid' : null)}
                    value={value}
                    readOnly={readonly}
                    disabled={disabled}
                    onChange={this.onChange}
                />
            </InputFormFieldWrapper>
        );
    }

    onChange(e: any) {
        const value = e.target.value;
        const { change = null, validate = null } = this.props;
        const error = validate && validate(value);
        if(change){ 
            change(value);
        }
        this.setState({ ... this.state, value, error });
    }
}
