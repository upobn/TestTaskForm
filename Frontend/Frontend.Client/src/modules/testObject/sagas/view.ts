import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, ACTIONS, IFetchInitAction } from '../actions/view';
import { getTestObject, ITestObject } from '../../../api/testObjects';
import { Action } from 'redux';
import { IErrorResponse } from '../../../api';

export function* fetchHandler(action: Action) {
    try {
        const { id } = action as IFetchInitAction;
        const result: ITestObject = yield call(getTestObject, id);
        yield put(actions.fetch.done(result));
    } catch (e) {
        yield put(actions.fetch.fail(e as IErrorResponse))
    }
}

export function* viewSaga() {
    yield takeLatest(ACTIONS.FETCH.INIT, fetchHandler);
}
