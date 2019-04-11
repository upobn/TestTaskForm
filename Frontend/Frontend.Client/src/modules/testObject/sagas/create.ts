import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';
import { actions, ACTIONS, ISaveInitAction } from '../actions/create';
import { createIssuer, IIssuer, IErrorResponse } from '../../../api';
import { Action } from 'redux';

export function* saveHandler(action: Action) {   
    try {
        const { item } = action as ISaveInitAction;
        const issuer : IIssuer = yield call(createIssuer, item);
        yield put(actions.save.done(issuer))
        yield put(push(`/issuers/${issuer.id}`));
    } catch (e) {
        yield put(actions.save.fail(e as IErrorResponse))
    }
}

export function* createSaga() {
    yield takeLatest(ACTIONS.SAVE.INIT, saveHandler)
}
