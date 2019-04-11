import * as React from 'react';

const css = require('./preloader.css');
const SpinnerSvg = require('-!svg-react-loader!./spinner-inline.svg');

export class Spinner extends React.Component {
    render() {
        return (
            <span className={css.spinner}><SpinnerSvg /></span>
        );
    }
}
