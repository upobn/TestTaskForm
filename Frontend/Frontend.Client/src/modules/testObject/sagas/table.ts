import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, ACTIONS, IFetchInitAction } from '../actions/table';
import { getTestObjects, ITestObject, IErrorResponse, IPagedList } from '../../../api';
import { Action } from 'redux';

export function* fetchHandler(action: Action) {
    try {
        const { page, pageSize } = action as IFetchInitAction;
        const result: IPagedList<ITestObject> = yield call(getTestObjects, page, pageSize);
        yield put(actions.fetch.done(result.items, result.totalCount))
    } catch (e) {
        yield put(actions.fetch.fail(e as IErrorResponse))
    }
}

export function* tableSaga() {
    yield takeLatest(ACTIONS.FETCH.INIT, fetchHandler);
}
