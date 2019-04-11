import * as React from 'react';

const css = require('./PageHeader.scss');

export interface IPageHeaderProps {
    title: string;
    subtitle?: string;
}

export class PageHeader extends React.Component<IPageHeaderProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { title, subtitle } = this.props;
        if (subtitle) {
            return (
                <div className={css.pageHeader}>
                    <h3>
                        <p className="d-inline">{title}</p>
                        <small className="text-muted">{subtitle}</small>
                    </h3>
                </div>
            );
        }

        return (
            <div className={css.pageHeader}>
                <h3>{title}</h3>
            </div>
        );
    }
}
