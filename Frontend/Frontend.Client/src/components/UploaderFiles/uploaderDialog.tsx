import * as React from 'react';

import * as ui from "../index";

import { IUploaderFilesProps } from './uploaderFiles';
import { UploaderDialogChooseFile } from './uploaderDialogChooseFile';


/**
 * Props состояния диалога загрузки
 */
export interface IUploaderDialogProps extends IUploaderFilesProps {
    isOpen: boolean;
    onClosed: () => void;
}

/**
 * Диалог
 * @param props
 * @constructor
 */
export const UploaderDialog: React.StatelessComponent<IUploaderDialogProps> = (props) => {
    const { isOpen, onClosed } = props;
    const chooseFile = <UploaderDialogChooseFile {...props} />;
    return (
        <ui.Modal name="UploaderFiles" isOpen={isOpen} onClosed={onClosed}>
            {chooseFile}
        </ui.Modal>
    );
};
