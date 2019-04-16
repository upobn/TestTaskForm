import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, ACTIONS, IDeleteInitAction } from '../actions/delete';
import { deleteTestObject, IErrorResponse } from '../../../api';
import { push } from 'react-router-redux';
import { Action } from 'redux';

function* deleteHandler(action: Action) {
    try {
        const { id } = action as IDeleteInitAction;
        yield call(deleteTestObject, id);
        yield put(actions.done())
        yield put(push('/TestObjects?refresh=true'));
    } catch (e) {
        yield put(actions.fail(e as IErrorResponse))
    }
}

export function* deleteSaga() {
    yield takeLatest(ACTIONS.DELETE.INIT, deleteHandler)
}
