import { Badge, Col, Input, Row, Tabs } from "antd";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetTaskById,
  useResetComment,
  useUpdateProgress,
  useUpdateTask,
} from "../workTask.hook";
import { get, head } from "lodash";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { useGetBoardById } from "~/modules/workBoard/workBoard.hook";
import { TaskItemProvider } from "~/store/TaskItemContext";
import Description from "../components/Description";
import UploadfileTaskItem from "../components/Upload";
import ActivityTask from "../components/ActivityTask";
import SelectStatusTask from "../components/SelectStatusTask";
import WhiteBox from "~/components/common/WhiteBox";
import RelationTask from "../components/RrelationTask";
import Assigner from "../components/Assigner";
import TodoList from "../components/TodoList";
import ComponentComment from "../components/ComponentComment";

interface Props {
  idTask?: any;
};
// const UploadfileTaskItem = lazy(() =>
// import('../components/Upload/index.js').then((module: any) => ({
//     default: module.UploadfileTaskItem,
//   }))
// );
// const SelectStatusTask = lazy(()=>import('./common/SelectStatusTask.js'));
// const RelationTask = lazy(()=>import('./Detail/RelationTask.js'));
// const ActivityTask = lazy(()=>import('./Detail/ActivityTask.js'));
// const TodoList= lazy(()=>import('./Detail/TodoList.js'));
// const Assigner= lazy(()=>import('./Detail/Assigner.js'));
// const Description = lazy(()=>import('./Detail/Description.js'));
// const ComponentComment = lazy(() => import('./Detail/ComponentComment.js'));

export default function TaskItem({ idTask }: Props) {
  const { taskId : id } = useParams();
  const [dataTask, isLoading] = useGetTaskById(idTask || id);
  const [isSubmit, updateTask] = useUpdateTask();
  const [isLoadingProgress, updateProgressTask] = useUpdateProgress();
  const [boardById] = useGetBoardById(dataTask?.boardId);
  const [, handleResetComment] = useResetComment();
  const [inputValue, setInputValue] = useState(get(dataTask, "name", ""));
  const [fileList_, setFileList] = useState([]);
  const [selected, setSelected] = useState(get(dataTask?.statusId, "_id"));
  useEffect(() => {
    if (dataTask?.fileList) {
      setFileList(dataTask?.fileList ?? []);
    }
  }, [dataTask]);
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = async (ev: any) => {
    if (!ev.target.value) {
      setInputValue(get(dataTask, "name", ""));
    };
    if (ev.target.value === get(dataTask, "name", "")) {
      return;
    };
  };
  useEffect(() => {
    return () => {
      handleResetComment([]);
    };
  }, [dataTask?._id]);

  useEffect(() => {
    const statusItem = boardById?.listStatusConfig.find(
      (item: any) => item?._id === dataTask?.statusId?._id
    );

    if (statusItem) {
      setSelected(statusItem._id);
    } else if (typeof dataTask?.statusId === "object") {
      setSelected(get(dataTask?.statusId, "value", "Không xác định"));
    } else {
      setSelected("Không xác định");
    }
  }, [boardById?.listStatusConfig, dataTask?.statusId]);
  const handleFinshed = useCallback((val: any, key: any) => {
    updateTask({
      [key]: val,
      id: idTask || id,
    });
  }, []);

  const handleChange = (value: any) => {
    setSelected(value);
    handleFinshed(value, "statusId");
  };
  return (
    <TaskItemProvider dataTask={dataTask}>
      <WhiteBox>
      <div className="work-task">
        <div className="page-task-detail_container">
          <div className="task-detail-header">
            <Row align="middle" gutter={16} style={{ width: "100%" }}>
              <Col>
                <SelectStatusTask
                  handleChange={handleChange}
                  value={selected}
                  defaultValue={selected}
                  initStatusValue={get(dataTask, "statusId", {})}
                  listStatus={boardById?.listStatusConfig}
                />
              </Col>
              <Col>
                <Text strong>#{get(dataTask, "code", "")} </Text>
              </Col>
              <Col sm={{ flex: 1 }} md={{ span: 9 }}>
                <Input
                  type="text"
                  size="small"
                  className="input-title-boardConfig"
                  style={{
                    width: "100%",
                    height: 30,
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                  value={inputValue || get(dataTask, "name", "")}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              <span>
                {" "}
                Ngày tạo:{" "}
                {moment(get(dataTask, "createdAt", "")).format("YYYY-MM-DD")}
              </span>
            </Col>
          </Row>
          <div className="task-detail-content">
            <Row gutter={[16, 16]} justify="center" wrap={false}>
              <Col flex={1} style={{ maxWidth: 1300, minWidth: "370px" }}>
                <div className="task-detail-content__left">
                  <Tabs
                    type="card"
                    defaultActiveKey="description"
                    className="task-detail-content__tabs"
                  >
                    <Tabs.TabPane tab={"Ghi chú công việc"} key="description">
                      {/* <Suspense fallback={<div>Mô tả...</div>}> */}
                      <Description
                        handleFinshed={handleFinshed}
                        dataTask={dataTask}
                      />
                      {/* </Suspense> */}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={
                        <Badge count={fileList_?.length ?? 0}>
                            <p style={{
                              padding: "2px 6px",
                            }}>Tệp đính kèm</p>
                        </Badge>
                      }
                      key="files"
                      style={{ height: "100%" }}
                    >
                      {/* <Suspense fallback={<div>Tải File...</div>}> */}
                      <UploadfileTaskItem
                        dataTask={dataTask}
                        handleFinshed={handleFinshed}
                        fileList_={fileList_}
                        setFileList={setFileList}
                      />
                      {/* </Suspense> */}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Lịch sử chỉnh sửa" key={"activity"}>
                      {/* <Suspense fallback={<div>Lịch sử...</div>}> */}
                      <ActivityTask />
                      {/* </Suspense> */}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Công việc liên quan" key={"relation"}>
                      {/* <Suspense fallback={<div>Công việc liên quan...</div>}> */}
                      <RelationTask/>
                    {/* </Suspense> */}
                    </Tabs.TabPane>
                  </Tabs>
                  {/* <Suspense fallback={<div>Trảng thái...</div>}><Assigner dataTask={dataTask} /></Suspense>
                  <Suspense fallback={<div>Trảng thái...</div>}><TodoList updateProgressTask={updateProgressTask} dataTask={dataTask} /></Suspense> */}
                    <Assigner dataTask={dataTask} />
                    <TodoList updateProgressTask={updateProgressTask} dataTask={dataTask} />
                </div>
              </Col>
            </Row>
          </div>
          <Row justify="center">
            <Col flex={1} style={{ maxWidth: 1300, minWidth: "370px" }}>
              <Tabs
                defaultActiveKey={"comment"}
                type="card"
                className="task-detail-history"
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                <Tabs.TabPane tab="Nội dung trao đổi" key={"comment"}>
                    <ComponentComment/>
                  {/* <Suspense fallback={<div>Trao đổi...</div>}>
                    </Suspense> */}
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
        </div>
      </WhiteBox>
    </TaskItemProvider>
  );
}
