import { httpGet, httpPost, httpPut, httpDelete, IPagedList } from "../common";
import * as moment from 'moment';


export enum FieldId2Type {
    Type1 = 'TYPE1',
    Type2 = 'TYPE2',
}
export const FieldId2Types: FieldId2Type[] = [FieldId2Type.Type1, FieldId2Type.Type2];

export enum FieldId5Type {
    Radio1 = 'RADIO1',
    Radio2 = 'RADIO2',
}
export const FieldId5Types: FieldId5Type[] = [FieldId5Type.Radio1, FieldId5Type.Radio2];

export interface ITestObject {
    id?: number;
    fieldId1: string | null;
    fieldId2Type: FieldId2Type;
    fieldId3?: moment.Moment;
    fieldId4?: boolean;
    fieldId5: FieldId5Type;
}

export function getTestObjects(page: number = 0, pageSize: number = 10) {
    return httpGet<IPagedList<ITestObject>>(`/api/testObjects`);
}

export function getTestObject(id: string) {
    return httpGet(`/api/testObjects/${id}`);
}

export function createTestObject(testObject: ITestObject) {
    return httpPost('/api/testObjects', testObject);
}

export function editTestObject(id: string, testObject: ITestObject) {
    return httpPut(`/api/testObjects/${id}`, testObject);
}

export function testObjectLogoUrl(id: number): string {
    return `/api/admin/testObjects/${id}/logo`;
}

export function uploadTestObjectLogo(id: number, buffer: Blob) {
    return httpPut(`/api/testObjects/${id}/logo`, buffer, { json: false, multipart: true });
}

export function deleteTestObject(id: number) {
    return httpDelete(`/api/testObjects/${id}`);
}

export function createAgreement(id: number, buffer: Blob) {
    return httpPost(`/api/testObjects/${id}/rentalAgreement`, buffer, { json: false, multipart: true });
}

export function editAgreement(id: number, buffer: Blob) {
    return httpPut(`/api/testObjects/${id}/rentalAgreement`, buffer, { json: false, multipart: true });
}
