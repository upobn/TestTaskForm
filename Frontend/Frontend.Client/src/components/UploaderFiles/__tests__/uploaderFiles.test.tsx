import * as React from "react";
import {shallow} from "enzyme";

import {ModeOfUploaderFiles, UploaderFiles} from "../index";
import {UploaderSingleFile} from "../uploaderSingleFile";
import {ISaveFile, IOpenFile} from "../eventInterfaces";

// jest.mock('-!svg-react-loader!./spinner.svg', () => 'Spinner');

describe('Тесты компонента UploaderFiles', () => {
        // it('Компонент UploaderFiles создаётся, для режима ModeOfUploaderFiles.SingleFile', () => {
        //         // GIVEN
        //         const mode = ModeOfUploaderFiles.SingleFile;
        //         const openButtonText = 'Открыть что-то';
        //         const uploadButtonText = 'Загрузить что-то';
        //         const uploaderDialogHeader = 'Загрузить что-то для';
        //         const acceptedTypes = '';
        //         const openFile: IOpenFile = ((() => {}) as IOpenFile);
        //         openFile.canOpen = false;
        //         const saveFile: ISaveFile = () => {};

        //         // WHEN
        //         const wrapper = shallow(<UploaderFiles mode={mode}
        //                                                openButtonText={openButtonText}
        //                                                uploadButtonText={uploadButtonText}
        //                                                uploaderDialogHeader={uploaderDialogHeader}
        //                                                acceptedTypes={acceptedTypes}
        //                                                openFile={openFile} saveFile={saveFile}/>);

        //         // THEN
        //         expect(wrapper.find(UploaderSingleFile.name)).toHaveLength(1);
        //     }
        // );
    }
);