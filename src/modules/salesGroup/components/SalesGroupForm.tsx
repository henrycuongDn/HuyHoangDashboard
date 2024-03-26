import { Button, Col, Divider, Form, Input, Row, Select, TreeSelect } from "antd";
import { get } from "lodash";
import React, { useCallback, useEffect, useMemo } from "react";
import RenderLoading from "~/components/common/RenderLoading";
import WithPermission from "~/components/common/WithPermission";
import GeoTreeSelect from "~/modules/geo/components/GeoTreeSelect";
import { RELATIVE_POSITION } from "~/modules/geo/constants";
import POLICIES from "~/modules/policy/policy.auth";
import { OPTIONS_SALES_GROUP_GEOGRAPHY } from "../constants";
import {
    useCreateSalesGroup, useGetSalesGroup, useResetAction
} from "../salesGroup.hook";
import { FieldTypeForm, propsTypeSalesGroupForm } from "../salesGroup.modal";
import { convertInitData, convertSubmitData } from "../salesGroup.service";

const SalesGroupForm = ({
  id,
  onCancel,
  onUpdate,
  parentNear : parentNearFromList,
  parentNearName : parentNearNameFromList,
  parentNearPath : parentNearPathFromList,
}: propsTypeSalesGroupForm): React.JSX.Element => {
  const [salesGroup, isLoading]:any = useGetSalesGroup(id);
  const parentNear = useMemo(() => id ? get(salesGroup,'parent._id','') : parentNearFromList,[salesGroup,id,parentNearFromList]);
  const parentNearName = useMemo(() => id ? get(salesGroup,'parent.name','') : parentNearNameFromList,[salesGroup,id,parentNearNameFromList]);
  const parentNearPath = useMemo(() => id ? get(salesGroup, "parent.managementArea", [])?.map(
    (area: any) => get(area, "path")
  ) : parentNearPathFromList ,[salesGroup,id,parentNearPathFromList]);

  const [form] = Form.useForm();
  const [isSubmitLoading, onCreate] = useCreateSalesGroup(onCancel);

  useResetAction();

  const onFinish = useCallback(
    (values: FieldTypeForm) => {
      const submitData = convertSubmitData(values);
      
      if (!id) {
        onCreate(submitData);
      } else {
        onUpdate({ ...submitData, _id: id });
      }
      
    },
    [id, onCreate, onUpdate]
  );

  useEffect(() => {
    if (id && salesGroup) {
      const initSalesGroup = convertInitData(salesGroup);
      form.setFieldsValue(initSalesGroup);
    }else{
      form.setFieldsValue({parentNear});
    }
  }, [form, id, salesGroup]);

  const onValuesChange = (value: any, values: any) => {
  }
  return (
    <div className="flex-column-center">
      {parentNear ? <i>*Nhóm cha: {parentNearName}</i> : ""}
      <Divider>
        <h5 className="text-center">{id ? "Cập nhật" : "Tạo mới"} nhóm bán hàng</h5>
      </Divider>
      <Form
        form={form}
        labelCol={{ sm: 24, md: 24, lg: 8, xl: 8 }}
        wrapperCol={{ sm: 24, md: 24, lg: 16, xl: 16 }}
        labelAlign="left"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
          <Form.Item<FieldTypeForm> hidden name={'parentNear'}/>
         <Row justify={"space-between"} align="middle" gutter={48}>
            <Col span={24}>
              <Form.Item<FieldTypeForm>
                label="Tên nhóm bán hàng"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên nhóm bán hàng" },
                ]}
              >
                {RenderLoading(isLoading,<Input />)}
              </Form.Item>
            </Col>
            </Row>
            
         <Row justify={"space-between"} align="middle" gutter={48}>
            <Col span={24}>
              <Form.Item<FieldTypeForm>
                label="Tên mô tả"
                name="alias"
              >
                {RenderLoading(isLoading,<Input />)}
              </Form.Item>
            </Col>
            </Row>

         <Row justify={"space-between"} align="middle" gutter={48}>
            <Col span={24}>
              <Form.Item
                label="Khu vực"
                name={['managementArea']}
                rules={[
                  { required: true, message: "Vui lòng chọn" },
                ]}
              >
                <GeoTreeSelect
                  autoClearSearchValue
                  labelInValue={true}
                  listItemHeight={200}
                  multiple={true}
                  showCheckedStrategy={TreeSelect.SHOW_ALL}
                  showEnabledValuesOnly={true}
                  showSearch={true}
                  size="large"
                  treeCheckStrictly={true}
                  treeCheckable={true}
                  treeDefaultExpandedKeys={['1', '2', '3']}
                  checkablePositions={!parentNearPath ? [RELATIVE_POSITION.IS_CHILD, RELATIVE_POSITION.IS_EQUAL] : [RELATIVE_POSITION.IS_CHILD]}
                  enabledValues={parentNearPath?.length ? parentNearPath : null}
                />
              </Form.Item>
            </Col>
            </Row>
            <Row justify={"space-between"} align="middle" gutter={48}>
            <Col span={24}>
              <Form.Item<FieldTypeForm>
                label="Loại nhóm"
                name="typeArea"
                rules={[
                  { required: true, message: "Vui lòng nhập!" },
                ]}
              >
                {RenderLoading(isLoading,<Select options={OPTIONS_SALES_GROUP_GEOGRAPHY}/>)}
              </Form.Item>
            </Col>
            </Row>
        <div className="btn-footer">
          <WithPermission permission={id ? POLICIES.UPDATE_SALESGROUP : POLICIES.WRITE_SALESGROUP}>
          <Button
            loading={isSubmitLoading}
            block
            type="primary"
            htmlType="submit"
          >
            {id ? "Cập nhật" : "Tạo mới"}
          </Button>
          </WithPermission>
          <Button onClick={onCancel} block danger>
            Huỷ
          </Button>
        </div>
        
      </Form>
    </div>
  );
};

export default SalesGroupForm;
