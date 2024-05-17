import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { createContext, useContext, useEffect, useState } from 'react';
import PaymentInOrder from '~/modules/paymentVoucher/components/PaymentInOrder';
import ReceiptInOrder from '~/modules/receiptVoucher/components/ReceiptInOrder';
type propsType = {
  billId?: any,
  defaultActiveTabKey?: string,
  isNotSentTime?: boolean
};
interface VoucherContextProps {
  billId?: any,
  isNotSentTime?: boolean;
};
const VoucherContext = createContext<VoucherContextProps>({
  billId: null,
})
export const useVoucherInOrderStore = (): VoucherContextProps => useContext(VoucherContext);

export default function VoucherInOrder({ billId,defaultActiveTabKey, isNotSentTime}: propsType): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('1');
  const onChange = (activeTab: any) => {
    setActiveTab(activeTab);
  };
  useEffect(() => {
    if (defaultActiveTabKey) {
      setActiveTab(defaultActiveTabKey);
    };
  }, [defaultActiveTabKey]);
  return (
    <VoucherContext.Provider value={{
      billId,
      isNotSentTime
    }}>
        <Tabs onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Phiếu thu" key="1">
          <ReceiptInOrder />
        </TabPane>
        <TabPane tab = "Phiếu chi" key = "2">
          <PaymentInOrder />
        </TabPane>
        </Tabs>
      </VoucherContext.Provider>
  )
}