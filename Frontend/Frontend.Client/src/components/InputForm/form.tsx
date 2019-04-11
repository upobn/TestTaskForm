import * as React from 'react';

export interface IInputFormProps {
    onSubmit: () => void;
}

export class InputForm extends React.Component<IInputFormProps> {
    constructor(props: any){
        super(props);

        this.onSubmitClick = this.onSubmitClick.bind(this);
    }
    render() {
        const { children } = this.props;

        return (
            <form onSubmit={this.onSubmitClick} >  
                {children}
            </form>
        );
    }

    onSubmitClick(e: any){
        const { onSubmit } = this.props;
        e.preventDefault(); 
        onSubmit();
    }
}
