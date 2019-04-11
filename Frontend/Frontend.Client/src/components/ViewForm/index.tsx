import * as React from 'react';
import * as fa from '../icons';
import * as moment from 'moment';

export class ViewForm extends React.Component {
    render() {
        return (
            <fieldset>
                {this.props.children}
            </fieldset>
        );
    }
}

export type ViewFormItemDataType = 'string' | 'datetime';

export interface IViewFormItemProps {
    label: string;
    value?: any;
    hint?: React.ReactChild;
    dataType?: ViewFormItemDataType;
    default?: any;
    full?: boolean;
    title?:string;
}

export class ViewFormItem extends React.Component<IViewFormItemProps> {
    render() {
        const { label, value = null, hint, title, dataType, default: defaultValue, full = false } = this.props;

        let input = null;
        if (value !== null) {
            switch (dataType) {
                case 'string':
                    input = (<input type="text" className="form-control" readOnly={true} value={value} />);
                    break;

                case 'datetime':
                    input = (<input type="text" className="form-control" readOnly={true} value={moment.utc(value).local().locale('ru').format('LL, LTS')} />);
                    break;

                default:
                    if (typeof value === "boolean") {
                        input = (value as boolean) ? <fa.CheckSquareO /> : <fa.SquareO />;
                    } else {
                        input = (<input type="text" className="form-control" readOnly={true} value={value} />);
                    }
                    break;
            }
        } else {
            input = defaultValue ? (<input type="text" className="form-control" readOnly={true} value={defaultValue} />) : this.props.children;
        }

        return (
            <div className="form-group row" title={title}>
                <label className="col-sm-3 col-form-label">{label}</label>
                <div className={full ? 'col-sm-9' : 'col-sm-4'}>
                    {input}
                </div>
                {!full && (
                    <div className="col-sm-5">
                        {hint}
                    </div>
                )}
            </div>
        );
    }
}

export interface IViewFormGroupProps {
    label: string;
}

export class ViewFormGroup extends React.Component<IViewFormGroupProps> {
    render() {
        const { label, children } = this.props;

        return (
            <div>
                <hr />
                <h5>{label}</h5>
                <div>
                    {children}
                </div>
            </div>
        );
    }
}
