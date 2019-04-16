import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, ACTIONS, IUploadInitAction } from '../actions/logo';
import { actions as viewActions } from '../actions/view';
import { IErrorResponse } from '../../../api';
import { Action } from 'redux';

function* uploadHandler(action: Action) {
    try {
        const { id, file } = action as IUploadInitAction;
        // yield call(uploadIssuerLogo, id, file);
        yield put(actions.upload.done());
        yield put(viewActions.fetch.init(id.toString()));
    } catch (e) {
        yield put(actions.upload.fail(e as IErrorResponse))
    }
}

export function* logoSaga() {
    yield takeLatest(ACTIONS.UPLOAD.INIT, uploadHandler);
}
