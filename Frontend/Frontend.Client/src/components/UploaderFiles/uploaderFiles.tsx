import * as React from 'react';
import {ModeOfUploaderFiles} from "./modeOfUploaderFiles";
import {UploaderSingleFile} from "./uploaderSingleFile";
import {StatelessComponent} from "react";
import {IOpenFile, ISaveFile} from "./eventInterfaces";
import {ReactNode} from "react";

/**
 * Props состояния загрузчика файлов
 */
export interface IUploaderFilesProps {
    inProgress?: boolean | null;
    error?: string | null;
    mode: ModeOfUploaderFiles;
    openButtonText: string;
    uploadButtonText: string;
    uploaderDialogHeader: string;
    acceptedTypes: string;
    openFile: IOpenFile;
    saveFile: ISaveFile;
}

/**
 * Загрузчик файлов
 * @param props
 * @constructor
 */
export const UploaderFiles: StatelessComponent<IUploaderFilesProps> = (props) => {
    let body: ReactNode;
    switch (props.mode) {
        case ModeOfUploaderFiles.SingleFile:
            body = (
                <UploaderSingleFile {...props}/>
            );
            break;
    }
    return (
        <div>
            {body}
        </div>
    );
};

