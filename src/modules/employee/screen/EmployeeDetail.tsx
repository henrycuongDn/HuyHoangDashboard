import { Badge, Flex, Input, Modal, Tabs, Typography } from "antd";
import { get } from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "~/components/common/Layout/List/Detail/Header";
import Layout from "~/components/common/Layout/List/Detail/Layout";
import ListInDetailCommon from "~/components/common/Layout/List/Detail/ListInDetailCommon";
import { STATUS_COLOR, STATUS_NAMES } from "~/constants/defaultValue";
import CollaboratorProduct from "~/modules/collaborator/components/CollaboratorProduct";
import POLICIES from "~/modules/policy/policy.auth";
import { PATH_APP } from "~/routes/allPath";
import EmployeeForm from "../components/EmployeeForm";
import MainContentTab from "../components/MainContentTab";
import apis from "../employee.api";
import {
  useDeleteEmployee,
  useEmployeePaging,
  useEmployeeQueryParams,
  useGetEmployee,
  useGetEmployeeId_onlyGet,
  useGetEmployees,
  useUpdateEmployee,
  useUpdateEmployeeParams
} from "../employee.hook";
import { employeeSliceAction } from "../redux/reducer";

const CLONE_STATUS_NAMES: any = STATUS_NAMES;
const CLONE_STATUS_COLOR: any = STATUS_COLOR;

export default function EmployeeDetail(): React.JSX.Element {
  const { id: employeeId }: any = useParams();
  const [id, setId] = useState<any>();
  const [query] = useEmployeeQueryParams(20);
  const [employee]: any = useGetEmployeeId_onlyGet();
  const [keyword, { setKeyword, onParamChange }] = useUpdateEmployeeParams(query);
  const [isOpenForm, setIsOpenForm] = useState(false);
  // const [destroy, setDestroy] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSearch = () => {
    onParamChange({ keyword });
    onClose();
  };

  const onCloseForm = useCallback(() => {
    setIsOpenForm(false);
    setId(null);
    // setDestroy(false);
  }, []);

  const onOpenForm = useCallback((idd?: any) => {
    setIsOpenForm(true);
    setId(idd);
    // idd && setDestroy(true);
  }, []);

  const resetAction = () => {
    return dispatch(employeeSliceAction.resetAction());
  };

  const [, handleUpdate] = useUpdateEmployee(() => {
    onCloseForm();
    resetAction();
  });
  const [, handleDelete] = useDeleteEmployee(resetAction);

  return (
    <>
      <Layout
        HeaderLeft={
          <Header.HeaderLeft
            PERMISSION_WRITE={POLICIES.WRITE_EMPLOYEE}
            onChangeStatus={(status) => onParamChange({ status })}
            onAdd={() => onOpenForm()}
            SearchProp={{
              openSearch: showDrawer,
              open,
              onClose,
              onSearch,
              SearchComponent: (
                <Input
                  placeholder="Nhập để tìm kiếm"
                  allowClear
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                />
              ),
              querySearch : ['keyword']
            }}
          />
        }
        HeaderRight={
          <Header.HeaderRight
            PERMISSION_DELETE={POLICIES.DELETE_EMPLOYEE}
            PERMISSION_UPDATE={POLICIES.UPDATE_EMPLOYEE}
            path={PATH_APP.employee.root}
            onDeleteClick={() => handleDelete(employeeId)}
            onEditClick={() => onOpenForm(employeeId)}
            name={
              <Flex gap={10} align="center">
                <h4>
                  {get(employee, "fullName", "") +
                    " - " +
                    get(employee, "employeeNumber", "")}
                </h4>
                <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                  <Badge
                    style={{ marginRight: 2 }}
                    status={CLONE_STATUS_COLOR[get(employee, "status", "")]}
                  />
                  {CLONE_STATUS_NAMES[get(employee, "status", "")]}
                </Typography.Text>
              </Flex>
            }
          />
        }
        MainContent={<MainContentTab />}
        List={<ListInDetailCommon
          fieldName="fullName"
          fieldCode="employeeNumber"
          path={'/employee-detail'}
          useGets={useGetEmployees}
          usePaging={useEmployeePaging}
          query={query}
          onParamChange={onParamChange}
          moduleName="employee"
        />}
      />
      <Modal
        open={isOpenForm}
        onCancel={() => setIsOpenForm(false)}
        onOk={() => setIsOpenForm(false)}
        className="form-modal"
        footer={null}
        width={1020}
        style={{ top: 50 }}
        // afterClose={() => {
        //   setDestroy(false);
        // }}
        // destroyOnClose={destroy}
      >
        <Tabs
          destroyInactiveTabPane
          items={[
            {
              key: "1",
              label: "Hồ sơ",
              children: (
                <EmployeeForm
                  id={id}
                  handleCloseModal={onCloseForm}
                  handleUpdate={handleUpdate}
                />
              ),
            },
            {
              key: "2",
              label: "Sản phẩm giới thiệu",
              children: (
                <CollaboratorProduct
                  id={id}
                  useGetUser={useGetEmployee}
                  apiSearchProduct={apis.searchProduct}
                  config={{
                    discount: {
                      discountType: "PERCENT",
                      value: 45,
                    },
                  }}
                  target="employee"
                />
              ),
              disabled: !id,
            },
          ]}
        ></Tabs>
      </Modal>
    </>
  );
}
