import { fork, all } from 'redux-saga/effects'
import { saga as modulesSaga } from '../modules';

export default function* root() {
    yield all([
        fork(modulesSaga)
    ]);
}
