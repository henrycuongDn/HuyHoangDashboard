import ReceiptVoucherScreen from "./screens/ReceiptVoucher";
import receiptVoucherApi from "./receiptVoucher.api";
import * as receiptVoucherAuth from "./receiptVoucher.auth";
import * as receiptVoucherHook from "./receiptVoucher.hook";
import * as receiptVoucherService from "./receiptVoucher.service";
import * as receiptVoucherModels from "./receiptVoucher.modal";
import reducer from "./redux/reducer";
import saga from "./redux/saga";

const moduleExport = {
    page : {
        index : ReceiptVoucherScreen,
    },
    api : receiptVoucherApi,
    auth : receiptVoucherAuth,
    hook : receiptVoucherHook,
    service : receiptVoucherService,
    model : receiptVoucherModels,
    redux : {reducer,saga}
};
export default moduleExport;