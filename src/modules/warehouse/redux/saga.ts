import { put, call, takeLatest } from 'redux-saga/effects';
import api from '../warehouse.api'; 
import { warehouseActions } from './reducer';

function* getListWarehouse({payload:query} : any) : any {
  try {
    const data = yield call(api.getAll,query);
    yield put(warehouseActions.getListSuccess(data));
    yield put(warehouseActions.clearAction());
  } catch (error:any) {
    yield put(warehouseActions.getListFailed(error));
  }
}

function* getByIdWarehouse({payload:id} : any) : any {
  try {
    const data = yield call(api.getById,id);
    yield put(warehouseActions.getByIdSuccess(data));
  } catch (error:any) {
    yield put(warehouseActions.getByIdFailed(error));
  }
}

function* createWarehouse({payload} : any) : any {
  try {
    const data = yield call(api.create,payload);
    yield put(warehouseActions.createSuccess(data));
  } catch (error:any) {
    yield put(warehouseActions.createFailed(error));
  }
}

function* updateWarehouse({payload} : any) : any {
  try {
    const data = yield call(api.update,payload);
    yield put(warehouseActions.updateSuccess(data));
  } catch (error:any) {
    yield put(warehouseActions.updateFailed(error));
  }
}
function* deleteWarehouse({payload : id} : any) : any {
  try {
    const data = yield call(api.delete,id);
    yield put(warehouseActions.deleteSuccess(data));
  } catch (error:any) {
    yield put(warehouseActions.deleteFailed(error));
  }
}


export default function* warehouseSaga() {
  yield takeLatest(warehouseActions.getListRequest, getListWarehouse);
  yield takeLatest(warehouseActions.getByIdRequest, getByIdWarehouse);
  yield takeLatest(warehouseActions.createRequest, createWarehouse);
  yield takeLatest(warehouseActions.updateRequest, updateWarehouse);
  yield takeLatest(warehouseActions.deleteRequest, deleteWarehouse);
}
