import * as React from 'react';

import * as ui from "../index";
import cn from "classnames";
import * as fa from "../icons";

import {IUploaderDialogProps} from "./uploaderDialog";
import {RefObject} from "react";

/**
 * Props состояния выбора файла диалога загрузки
 */
interface IUploaderDialogChooseFileProps extends IUploaderDialogProps {
}

/**
 * State состояния выбора файла диалога загрузки
 */
interface IUploaderDialogChooseFileState {
    error: string;
}

/**
 * Выбор файла диалога загрузки
 */
export class UploaderDialogChooseFile extends React.Component<IUploaderDialogChooseFileProps, IUploaderDialogChooseFileState> {

    static filesExists(files: FileList | null) {
        return files && files.length > 0;
    }

    private readonly inputFileRef: RefObject<HTMLInputElement>;

    constructor(props: IUploaderDialogChooseFileProps) {
        super(props);
        this.state = {
            error: ''
        };
        this.inputFileRef = React.createRef();
    }

    manipulationError = (files: FileList | null) => {
        const error = (UploaderDialogChooseFile.filesExists(files)) ? '' : 'Выберите файл';
        this.setState(prevState => ({
            ...prevState,
            error
        }));
        return error === '';
    };

    onInputChange = () => {
        if (this.inputFileRef.current) {
            this.manipulationError(this.inputFileRef.current.files);
        }
    };

    onSubmit = () => {
        if (this.inputFileRef.current) {
            const files = this.inputFileRef.current.files;
            if(this.manipulationError(files)) {
                if (files) {
                    this.props.saveFile(files[0]);
                }
                this.props.onClosed();
            }
        }
    };

    render() {
        const {uploaderDialogHeader, inProgress, acceptedTypes} = this.props;
        const {error} = this.state;
        const errorView = <p className="alert alert-danger">{error}</p>;
        return (
            <ui.ModalDialog onSubmit={this.onSubmit}>
                <ui.ModalPreloaderOverlay inProgress={inProgress}>
                    <ui.ModalHeader title={uploaderDialogHeader}/>
                    <ui.ModalBody>
                        <div className="form-group">
                            <label>Выберите файл</label>
                            <input type="file" className={cn('form-control', this.state.error ? 'is-invalid' : null)}
                                   ref={this.inputFileRef} onChange={this.onInputChange}
                                   accept={acceptedTypes}/>
                            <div className="invalid-feedback">{this.state.error}</div>
                        </div>
                        {this.state.error && errorView}
                    </ui.ModalBody>
                    <ui.ModalFooter>
                        <ui.ModalButton text="Загрузить" action="submit" icon={<fa.Check/>}/>
                        <ui.ModalButton text="Отмена" action="dismiss" icon={<fa.Times/>}/>
                    </ui.ModalFooter>
                </ui.ModalPreloaderOverlay>
            </ui.ModalDialog>
        );
    }

}