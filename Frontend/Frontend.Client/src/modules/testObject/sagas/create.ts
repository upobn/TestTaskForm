import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';
import { actions, ACTIONS, ISaveInitAction } from '../actions/create';
import { createTestObject, ITestObject, IErrorResponse } from '../../../api';
import { Action } from 'redux';

export function* saveHandler(action: Action) {   
    try {
        const { item } = action as ISaveInitAction;
        const testObject : ITestObject = yield call(createTestObject, item);
        yield put(actions.save.done(testObject))
        yield put(push(`/testObjects/${testObject.id}`));
    } catch (e) {
        yield put(actions.save.fail(e as IErrorResponse))
    }
}

export function* createSaga() {
    yield takeLatest(ACTIONS.SAVE.INIT, saveHandler)
}
