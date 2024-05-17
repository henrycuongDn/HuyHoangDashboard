import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect } from "react";
import Breadcrumb from "~/components/common/Breadcrumb";
import { useGetRole } from "~/modules/auth/auth.hook";
import ReportChart from "../components/ReportChart";
import { useChangeParam, useReportProductSupplierQueryParams } from "../reportProductSupplier.hook";

export default function ReportProductSupplier() {
  const role = useGetRole();
  const [query] = useReportProductSupplierQueryParams();
  const changeParam = useChangeParam(query)
useEffect(() => {
  changeParam({ 
    spaceType: 'pharma_profile',
    dataType:'groupProduct'
  })
}, []);
  return (
    <>
      <Breadcrumb title={"Báo cáo tổng quan"} />
      <Tabs
        type="card"
        onChange={(value)=>{
          changeParam({
            spaceType: value,
            dataType:'groupProduct'
          })
        }}
        style={{
          height: "calc(100% - 68px)",
        }}
        destroyInactiveTabPane
      >
        {role !== "partner" && (
          <TabPane tab="OTC" key={'pharma_profile'}>
            <ReportChart query={query} spaceType={"pharma_profile"} />
          </TabPane>
        )}
        <TabPane tab="B2C" style={{ height: "100%" }} key={'partner'} destroyInactiveTabPane>
          <ReportChart query={query} spaceType={"partner"}/>
        </TabPane>
      </Tabs>
    </>
  );
}
