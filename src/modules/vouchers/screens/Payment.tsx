import { Button, Modal, Table } from 'antd';
import dayjs from 'dayjs';
import { get, toUpper } from 'lodash';
import React, { useState } from 'react';
import { MAP_STATUS_VOUCHERS_VI, REF_COLLECTION } from '~/constants/defaultValue';
import { useGetPaymentVouchers, usePaymentVoucherQueryParams } from '~/modules/paymentVoucher/paymentVoucher.hook';
import StatusTag from '../components/StatusTag';
import PaymentVoucherForm from '~/modules/paymentVoucher/components/PaymentVoucherForm';
type propsType = {

};
interface Column {
  title: string;
  dataIndex?: string;
  key: string;
  render?: (text: any, record: any, index: number) => React.ReactNode;
  align?: string;
};

export default function   PaymentVouchers(props: propsType): React.JSX.Element {
  const [query, onTableChange] = usePaymentVoucherQueryParams();
  const [vouchers, isLoading] = useGetPaymentVouchers(query);
  const [id, setId] = useState<string | null>();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [refCollection, setRefCollection] = useState<string | undefined>();
  const [item, setItem] = useState<any>();

  const onOpenForm = (id: string | null) => {
    setId(id);
    setIsOpenForm(true);
  };
  const onClose = () => {
    setId(null);
    setIsOpenForm(false);
  };
  console.log(vouchers, 'vouchers')
  const columns: Column[] = [
    {
      title: 'Mã phiếu chi',
      dataIndex: 'code',
      key: 'code',
      render: (text, record, index) => {
        return (
          <Button type='link' onClick={() => {
            onOpenForm(record?._id);
            setRefCollection(record?.refCollection?.toUpperCase());
            setItem(record);
          }}>
            {text}
          </Button>
        );
      },
    },
    {
      title: 'Số chứng từ',
      dataIndex: 'issueNumber',
      key: 'issueNumber',
      render: text => text || "-",
    },
    {
      title: 'Mã đơn hàng',
      key: 'billNumber',
      align: 'center',
      render: (text, record, index) => get(record, "whBill.billNumber") ? get(record, "whBill.billNumber") : '-',
    },
    {
      title: 'Nội dung',
      key: 'reason',
      dataIndex: 'reason',
    },
    {
      title: 'ID dịch vụ',
      dataIndex: 'whServiceId',
      key: 'whServiceId',
    },
    {
      title: 'Số tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text, record, index) => text?.toLocaleString(),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record, index) => dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: 'Ngày duyệt',
      dataIndex: 'dateApproved',
      key: 'dateApproved',
      render: (text, record, index) => text && dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => <StatusTag status={text}/>
    },
  ];
  
  return (
    <>
      <Table
        columns={columns as any}
        dataSource={vouchers}
      />
      <Modal
        footer={null}
        title={`Phiếu chi - ${item?.code}`}
        open={isOpenForm}
        onCancel={onClose}
        width={1366}
        destroyOnClose
      >
        <PaymentVoucherForm
          id={id}
          onClose={onClose}
          refCollection = {refCollection}
        />
      </Modal>
    </>
  )
}