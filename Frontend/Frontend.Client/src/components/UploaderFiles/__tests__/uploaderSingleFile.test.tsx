import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import mockConsole from 'jest-mock-console';

import { UploaderSingleFile } from '../uploaderSingleFile';
import { ModeOfUploaderFiles } from '../modeOfUploaderFiles';
import { IOpenFile, ISaveFile } from '../eventInterfaces';


describe('Тесты компонента UploaderSingleFile', () => {

    //         it('Компонент в режиме, когда он не может открыть файл', () => {
    //                 jest.spyOn(global.console, 'warn');
    //                 // GIVEN
    //                 const mode = ModeOfUploaderFiles.SingleFile;
    //                 const openButtonText = 'Открыть что-то';
    //                 const uploadButtonText = 'Загрузить что-то';
    //                 const uploaderDialogHeader = 'Загрузить что-то для';
    //                 const acceptedTypes = '';
    //                 const openFile: IOpenFile = (() => {}) as IOpenFile;
    //                 openFile.canOpen = false;
    //                 const saveFile: ISaveFile = () => {};

    //                 // MOCK
    //                 mockConsole('error');

    //                 // WHEN
    //                 const wrapper = shallow(<UploaderSingleFile mode={mode}
    //                                                             openButtonText={openButtonText}
    //                                                             uploadButtonText={uploadButtonText}
    //                                                             uploaderDialogHeader={uploaderDialogHeader}
    //                                                             acceptedTypes={acceptedTypes} openFile={openFile}
    //                                                             saveFile={saveFile}/>);

    //                 // THEN
    //                 expect(wrapper.find(Button.name)).toHaveLength(1);
    //                 expect(wrapper.find(Button.name).prop('bsStyle')).toBe('outline-dark');
    //             }
    //         );

    //         it('Компонент в режиме, когда он может открыть файл', () => {
    //                 // GIVEN
    //                 const mode = ModeOfUploaderFiles.SingleFile;
    //                 const openButtonText = 'Открыть что-то';
    //                 const uploadButtonText = 'Загрузить что-то';
    //                 const uploaderDialogHeader = 'Загрузить что-то для';
    //                 const acceptedTypes = '';
    //                 const openFile: IOpenFile = (() => {}) as IOpenFile;
    //                 openFile.canOpen = true;
    //                 const saveFile: ISaveFile = () => {};

    //                 // MOCK
    //                 mockConsole('error');

    //                 // WHEN
    //                 const wrapper = shallow(<UploaderSingleFile mode={mode}
    //                                                             openButtonText={openButtonText}
    //                                                             uploadButtonText={uploadButtonText}
    //                                                             uploaderDialogHeader={uploaderDialogHeader}
    //                                                             acceptedTypes={acceptedTypes}
    //                                                             openFile={openFile}
    //                                                             saveFile={saveFile}/>);

    //                 // THEN
    //                 expect(wrapper.find(Button.name)).toHaveLength(2);
    //                 expect(wrapper.find(Button.name).map(x => x.prop('bsStyle'))).toEqual(['link', 'outline-dark']);
    //             }
    //         );
}
);