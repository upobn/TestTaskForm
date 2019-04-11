import { call, put, take, select } from "redux-saga/effects";
// import { actions, ACTIONS } from '../modules/auth/actions/auth';
import { IState } from '../reducers';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IResponseStatus {
    status: number;
    statusText: string;
}

export interface IErrorResponse extends IResponseStatus {
    code: number;
    error: string;
    msg: string;
}

export const printErrorResponse = (err: IErrorResponse): string => {
    const e = err as any;

    let msg: string;
    if (err.error) {
        msg = `[${err.error}] ${err.msg}`;
    }
    else if (e.message) {
        msg = e.message;
    } else {
        msg = 'Неизвестная ошибка';
    }

    const validatorError = err as IValidationErrorResponse;
    if (validatorError && validatorError.details) {
        msg += '\n';
        msg += validatorError.details.map((r)=>`${r.field}: ${r.msg}`).join('\n');
    }

    return msg;
}

export interface IValidationError {
    field: string;
    msg: string;
}

export interface IValidationErrorResponse extends IErrorResponse {
    details: IValidationError[];
}

export interface IPagedList<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
}

function* fetchAndParse(url: string, init: RequestInit) {
    const response: Response = yield call(fetch, url, init);
    const isJsonResponse = (response.headers.get('Content-Type') || '').includes('application/json');

    if (response.ok) {
        if (response.status === 204) {
            return;
        }

        if (isJsonResponse) {
            const json = yield call({
                context: response,
                fn: response.json
            });
            return json;
        }
    }

    if (!isJsonResponse) {
        if (response.status === 400) {
            const error: IValidationErrorResponse = {
                status: response.status,
                statusText: response.statusText,
                code: response.status,
                error: 'E_BAD_REQUEST',
                msg: 'Некорректные параметры запроса\nСервер не предоставил подробностей ошибки.',
                details: []
            }
            throw error;
        } else {
            const error: IErrorResponse = {
                status: response.status,
                statusText: response.statusText,
                code: response.status,
                error: 'E_HTTP_ERROR',
                msg: 'Ошибка исполнения запроса\nСервер не предоставил подробностей ошибки.'
            }
            throw error;
        }
    }

    if (response.status === 400) {
        const error: IValidationErrorResponse = yield call({
            context: response,
            fn: response.json
        });
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
    } else {
        const error: IErrorResponse = yield call({
            context: response,
            fn: response.json
        });
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
    }
}

export interface IHttpExecuteOptions {
    authorize?: boolean;
    json?: boolean;
    multipart?: boolean;
}

interface IMessage {
    method: HttpMethod,
    headers: Headers,
    body: FormData | string | null
}

export function* httpExecute<T = any>(
    httpMethod: HttpMethod,
    url: string,
    body?: any,
    options: IHttpExecuteOptions = {}) {

    const init: IMessage = {
        method: httpMethod,
        headers: new Headers(),
        body: null
    }

    const { authorize = true, json = true, multipart } = options;

    if (json && body) {
        init.headers.set('Content-Type', 'application/json');
        init.body = JSON.stringify(body);
    }

    if (multipart && body) {
        const form = new FormData();
        form.append('file', body);
        init.body = form;
    }

    if (authorize) {

        const selector = (state: IState) => {
            return {
               
            };
        };
        while (true) {
            const { isAuthorized, accessToken, authenticationScheme } = yield select(selector);
            // if (!isAuthorized) {
            //     yield put(actions.logout());
            //     yield take(ACTIONS.LOGOUT);
            //     continue;
            // }

            init.headers.set('Authorization', `${authenticationScheme} ${accessToken}`);

            try {
                const response = yield call(fetchAndParse, url, init);
                return response as T;
            } catch (err) {
                const error = err as IResponseStatus;
                if (error.status === 401) {
                    // yield put(actions.logout());
                    // yield take(ACTIONS.LOGOUT);
                    continue;
                }

                throw err;
            }
        }

    } else {
        const response = yield call(fetchAndParse, url, init);
        return response as T;
    }
}

export function* httpGet<T = any>(url: string, options?: IHttpExecuteOptions) {
    return yield httpExecute<T>('GET', url, null, options);
}

export function* httpPost<T = any>(url: string, body: any, options?: IHttpExecuteOptions) {
    return yield httpExecute<T>('POST', url, body, options);
}

export function* httpPut<T = any>(url: string, body: any, options?: IHttpExecuteOptions) {
    return yield httpExecute<T>('PUT', url, body, options);
}

export function* httpPatch<T = any>(url: string, body: any, options?: IHttpExecuteOptions) {
    return yield httpExecute<T>('PATCH', url, body, options);
}

export function* httpDelete(url: string, options?: IHttpExecuteOptions) {
    return yield httpExecute('DELETE', url, null, options);
}
