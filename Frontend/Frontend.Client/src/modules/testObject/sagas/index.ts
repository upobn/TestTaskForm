import { fork, all } from "redux-saga/effects";
import { viewSaga, } from "./view";
import { tableSaga } from "./table";
import { createSaga } from './create';
import { editSaga } from './edit';

export function* saga() {
    yield all([
        fork(viewSaga),
        fork(tableSaga),
        fork(createSaga),
        fork(editSaga),
    ]);
}
