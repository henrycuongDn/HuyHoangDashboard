import { createSlice } from "@reduxjs/toolkit";
import { InstanceModuleRedux } from "~/redux/instanceModuleRedux";
import { initStateSlice } from "~/redux/models";
interface cloneInitState extends initStateSlice {
 // Add cloneInitState Type Here
}
class ReceiptVoucherClassExtend extends InstanceModuleRedux {
  cloneReducer;
  cloneInitState : cloneInitState;
  constructor() {
    super('receiptVoucher');
    this.cloneReducer = {
      ...this.initReducer,
      // Want Add more reducer Here...
    }
    this.cloneInitState = {
      ...this.initialState,
      // Want Add more State Here...
    }
  }
  createSlice() {
    return createSlice({
      name: this.module,
      initialState: this.cloneInitState,
      reducers:  this.cloneReducer,
    });
  }
  
}

const newSlice = new ReceiptVoucherClassExtend();
const data = newSlice.createSlice();


export const receiptVoucherSliceAction = data.actions;
export default data.reducer;
