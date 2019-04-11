import * as React from 'react';
import {Button} from 'react-bootstrap';

import {IUploaderFilesProps} from './uploaderFiles';
import {UploaderDialog} from './uploaderDialog';
import { ToolbarButton } from '../../components';

/**
 * Props состояния загрузчика одиночного файла
 */
interface IUploaderSingleFileProps extends IUploaderFilesProps {}

/**
 * State
 */
interface IUploaderSingleFileState {
    isOpenUploaderDialog: boolean;
}

/**
 * Загрузчик одиночного файла
 */
export class UploaderSingleFile extends React.Component<IUploaderSingleFileProps, IUploaderSingleFileState> {

    constructor(props: IUploaderSingleFileProps) {
        super(props);
        this.state = {
            isOpenUploaderDialog: false
        };
    }

    manipulationUploaderDialog = () => this.setState(prevState => ({isOpenUploaderDialog: !prevState.isOpenUploaderDialog}));

    openUploaderDialog = () => this.manipulationUploaderDialog();

    closeUploaderDialog = () => this.manipulationUploaderDialog();

    render() {
        const {openFile, openButtonText, uploadButtonText } = this.props;
        const {isOpenUploaderDialog} = this.state;
        let openButton: React.ReactNode;
        if (openFile.canOpen) {
            openButton = <Button onClick={openFile}>{openButtonText}</Button>;
        }
        const uploaderDialog = () =>
            <UploaderDialog {...this.props} isOpen={isOpenUploaderDialog}
                            onClosed={this.closeUploaderDialog}/>;
        return (
            <span>
                {uploaderDialog()}
                {openButton}
                <ToolbarButton onClick={this.openUploaderDialog} text={uploadButtonText}/>
            </span>
        );
    }

}
