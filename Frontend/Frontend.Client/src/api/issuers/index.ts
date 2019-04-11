import { httpGet, httpPost, httpPut, httpDelete, IPagedList } from "../common";
import * as moment from 'moment';

export interface IIssuer {
    id: number;
    Logo?: Blob[];
    isShowInMainPage?: boolean;
    isActive?: boolean;
    websiteUrl: string | null;
    region: string | null;
    sector: string | null;
    code: string;
    nameRu: string;
    descrRu: string | null;
    descrEn: string | null;
    nameEn: string | null;
    creationTime?: moment.MomentInput;
    lastChangeTime?: moment.MomentInput;
}

export function getIssuers(page: number = 0, pageSize: number = 10) {
    return httpGet(`/api/values`, { authorize: true });
}

export function getIssuer(id: string) {
    return httpGet(`/api/values/${id}`);
}

export function createIssuer(issuer: IIssuer) {
    return httpPost('/api/issuers', issuer);
}

export function editIssuer(id: string, issuer: IIssuer) {
    return httpPut(`/api/issuers/${id}`, issuer);
}

export function issuerLogoUrl(id: number): string {
    return `/api/admin/issuers/${id}/logo`;
}

export function uploadIssuerLogo(id: number, buffer: Blob) {
    return httpPut(`/api/issuers/${id}/logo`, buffer, { json: false, multipart: true });
}

export function deleteIssuer(id: number) {
    return httpDelete(`/api/issuers/${id}`);
}

export function createAgreement(id: number, buffer: Blob) {
    return httpPost(`/api/issuers/${id}/rentalAgreement`, buffer, { json: false, multipart: true });
}

export function editAgreement(id: number, buffer: Blob) {
    return httpPut(`/api/issuers/${id}/rentalAgreement`, buffer, { json: false, multipart: true });
}
