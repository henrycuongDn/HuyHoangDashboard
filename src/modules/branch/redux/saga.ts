import { put, call, takeLatest } from 'redux-saga/effects';
import api from '../branch.api'; 
import { branchSliceAction } from './reducer';

function* getListBranch({payload:query} : any) : any {
  try {
    const data = yield call(api.getAll,query);
    yield put(branchSliceAction.getListSuccess(data));
  } catch (error:any) {
    yield put(branchSliceAction.getListFailed(error));
  }
}

function* getByIdBranch({payload:id} : any) : any {
  try {
    const data = yield call(api.getById,id);
    yield put(branchSliceAction.getByIdSuccess(data));
  } catch (error:any) {
    yield put(branchSliceAction.getByIdFailed(error));
  }
}

function* createBranch({payload} : any) : any {
  try {
    const data = yield call(api.create,payload);
    yield put(branchSliceAction.createSuccess(data));
  } catch (error:any) {
    yield put(branchSliceAction.createFailed(error));
  }
}

function* updateBranch({payload} : any) : any {
  try {
    const data = yield call(api.update,payload);
    yield put(branchSliceAction.updateSuccess(data));
  } catch (error:any) {
    yield put(branchSliceAction.updateFailed(error));
  }
}
function* deleteBranch({payload : id} : any) : any {
  try {
    const data = yield call(api.delete,id);
    yield put(branchSliceAction.deleteSuccess(data));
  } catch (error:any) {
    yield put(branchSliceAction.deleteFailed(error));
  }
}


export default function* branchSaga() {
  yield takeLatest(branchSliceAction.getListRequest, getListBranch);
  yield takeLatest(branchSliceAction.getByIdRequest, getByIdBranch);
  yield takeLatest(branchSliceAction.createRequest, createBranch);
  yield takeLatest(branchSliceAction.updateRequest, updateBranch);
  yield takeLatest(branchSliceAction.deleteRequest, deleteBranch);
}
