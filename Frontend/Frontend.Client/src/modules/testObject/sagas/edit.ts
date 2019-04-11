import { call, put, takeLatest, all } from 'redux-saga/effects'
import { push } from 'react-router-redux';
import { actions, ACTIONS, IFetchInitAction, ISaveInitAction } from '../actions/edit';
import { getIssuer, editIssuer, IIssuer, IErrorResponse } from '../../../api';
import { Action } from 'redux';

export function* fetchHandler(action: Action) {
    try {
        const { id } = action as IFetchInitAction;
        const result: IIssuer = yield call(getIssuer, id);
        yield put(actions.fetch.done(result))
    } catch (e) {
        yield put(actions.fetch.fail(e as IErrorResponse))
    }
}

export function* saveHandler(action: Action) {
    try {
        const { id, item } = action as ISaveInitAction;
        yield call(editIssuer, id, item);
        yield put(actions.save.done())
        yield put(push(`/issuers/${id}`));
    } catch (e) {
        yield put(actions.save.fail(e as IErrorResponse))
    }
}

export function* editSaga() {
    yield all([
        takeLatest(ACTIONS.FETCH.INIT, fetchHandler),
        takeLatest(ACTIONS.SAVE.INIT, saveHandler),
    ]);
}
