import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import { InstanceModuleRedux } from "~/redux/instanceModuleRedux";
import { getPaging } from "~/utils/helpers";
import { cloneInitState } from "../supplier.modal";

class SupplierClassExtend extends InstanceModuleRedux {
  clone;
  cloneInitState: cloneInitState;
  constructor() {
    super("supplier");
    this.clone = {
      ...this.initReducer,
      // Add More Reducer
      getProductSupplierRequest: (state: any) => {
        state.isLoadingGetProductSupplier = true;
        state.getProductSupplierFailed = null;
      },
      getProductSupplierSuccess: (state: any, { payload }: any) => {
        state.isLoadingGetProductSupplier = false;
        state.productSupplier = get(payload, "docs", []);
        state.pagingProductSupplier = getPaging(payload);
      },
      getProductSupplierFailed: (state: any, { payload }: any) => {
        state.isLoadingGetProductSupplier = false;
        state.getProductSupplierFailed = payload;
      },
      getSuppliersProductAuthorRequest: (state: any) => {
        state.isLoadingGetSuppliersProductAuthor = true;
        state.getSuppliersProductAuthorFailed = null;
      },
      getSuppliersProductAuthorSuccess: (state: any, { payload }: any) => {
        state.isLoadingGetSuppliersProductAuthor = false;
        state.suppliersProductAuthor = payload;
        state.pagingSuppliersProductAuthor = getPaging(payload);
      },
      getSuppliersProductAuthorFailed: (state: any, { payload }: any) => {
        state.isLoadingGetSuppliersProductAuthor = false;
        state.getSuppliersProductAuthorFailed = payload;
      },
    };
    // Add More InitState
    this.cloneInitState = {
      ...this.initialState,
      isLoadingGetProductSupplier: false,
      getProductSupplierFailed: null,
      productSupplier: [],
      pagingProductSupplier: null,
      isLoadingGetSuppliersProductAuthor: false,
      suppliersProductAuthor: [],
      pagingSuppliersProductAuthor: null, 
      getSuppliersProductAuthorFailed: null, 
    };
  }
  createSlice() {
    return createSlice({
      name: this.module,
      initialState: this.cloneInitState,
      reducers: this.clone,
    });
  }
}

const newSlice = new SupplierClassExtend();
const data = newSlice.createSlice();


export const supplierSliceAction   = data.actions;
export default data.reducer;
