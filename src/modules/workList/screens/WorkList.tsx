import React, { createContext, useContext, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { Button, Drawer, Modal, Space, Spin } from 'antd';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { ResizableBox } from 'react-resizable';
import Text from 'antd/lib/typography/Text';
import { get } from 'lodash';
import { useCreateWorkList, useDeleteWorkList, useGetListWorkConfig, useWorkListQueryParams } from '../workList.hook';
import Menufilter from '../components/Menufilter';
import { useGetWorkSprint } from '~/modules/workSprint/workSprint.hook';
import MenuListBoard from '~/modules/workSprint/components/MenuListBoard';
import BoardConfig from '../components/WorkListConfig';
import { FormTaskContextProps } from '../workList.modal';
import { useCreateWorkTask, useDeleteWorkTask, useUpdateWorkTask } from '~/modules/workTask/workTask.hook';
import { useGetlistWorkBoardById } from '~/modules/workBoard/workBoard.hook';
// import { useGetSprintInfo } from '~/hooks/workSprint';
// import { useWorkListQueryParams } from '~/hooks/workList';
// import { WithOrPermission } from '../Common';
// import POLICIES from '~/constants/policy';
// import BoardConfig from './BoardConfig';
// import MenuListBoard from './WorkList/MenuListBoard';
// import TaskForm from './TaskForm/TaskForm';
// import TaskTabDetail from './TaskTabs/TaskTabDetail';
// import MenuFilter from './MenuFilter';

const FormTaskContext = createContext();
export const useFormTaskContext = () => useContext<FormTaskContextProps|any>(FormTaskContext);

const WorkList = () => {
  const workflowRef = useRef<any>(); // You can replace 'any' with a more specific type if available

  const { sprintId: sprintId_ } = useParams();
  const sprintId = useMemo(() => sprintId_, [sprintId_]);
  const [sprintInfo] = useGetWorkSprint(sprintId);
  const idBoard = useMemo(() => sprintInfo?.boardId, [sprintInfo]);
  const [query] = useWorkListQueryParams(sprintId);
  const [visibleModal, setVisibleModal] = useState(false);
  const [boardConfig] = useGetListWorkConfig(query);
  const boardConfigMemo = useMemo(() => (boardConfig ?? []).map(({ name, _id }:any) => ({ name, _id })), [boardConfig]);
  // const [data] = useListBoardConfigItem();
  const [propsModal, setPropsModal] = useState({});
  const [visibleInfo, setVisibleInfo] = useState(false);
const [lengthList, setLength] = useState<number>(
  workflowRef?.current?.offsetWidth ?? window.innerWidth
);
  let data = boardConfigMemo;
  
  const [taskData, setTaskData] = useState('');
  const [visibleListBoard, setVisibleListBoard] = useState(false);
  const [idVisibleInfo, setIdVisibleInfo] = useState('');
  const [, updateTask] = useUpdateWorkTask();
  // const [, updatePosition] = useUpdatePosition();
  const [, handleCreateTask] = useCreateWorkTask();
  const [, handleDeleteTask] = useDeleteWorkTask();
  const [, handleCreateWork] = useCreateWorkList();
  const [, handleDeleteWork] = useDeleteWorkList();
  const [tasksAllBoard, setTasksAllBoard] = useState({});
  const [boardData] = useGetlistWorkBoardById(idBoard);

  const showDrawer = (param?:any) => {
    setVisibleListBoard((val) => param ?? !val);
  };

  const openFormTask = (id:any, data:any) => {
    setPropsModal({ boardConfigId: id });
    setVisibleModal(true);
  };

  useEffect(() => {
    if (!visibleInfo) {
      setLength(workflowRef?.current?.offsetWidth ?? window.innerWidth);
    } else {
      setLength(workflowRef?.current?.offsetWidth * 0.7);
    }
  }, [visibleInfo]);

  const onDragEndv2 = (result:any) => {
    let colBefore = result?.source?.droppableId,
      indexBefore = result?.source?.index,
      colAfter = result?.destination?.droppableId,
      indexAfter = result?.destination?.index;

    if (!colAfter) {
      return;
    }

    let dataBefore = [...{ ...data }[colBefore]];
    let dataAfter = [...data[colAfter]];

    if (colBefore === colAfter) {
      if (indexBefore === indexAfter) {
        return;
      }
      dataAfter.splice(indexBefore, 1);
    }

    let valueIdxUp = get(dataAfter[indexAfter - 1], 'ordinal', 0);
    let valueIdxDown = get(dataAfter[indexAfter], 'ordinal', valueIdxUp + 10);

    let newOrdinal = (valueIdxUp + valueIdxDown) / 2;

    let [{ ...itemBeRemove }] = dataBefore.splice(indexBefore, 1);
    Object.assign(itemBeRemove ?? {}, { ordinal: newOrdinal });

    updateTask({ id: itemBeRemove._id, ordinal: newOrdinal, boardConfigId: colAfter });
    // updatePosition({
    //   colBefore,
    //   indexBefore,
    //   colAfter,
    //   indexAfter,
    // });
  };

  return (
    <div className="branch-detail page-wraper page-content page-workflow">
      <FormTaskContext.Provider
        value={{
          ...propsModal,
          setPropsModal,
          openForm: openFormTask,
          boardId: idBoard,
          boardData,
          sprintId: sprintId_,
          updateTask,
          handleCreateTask,
          handleDeleteWork,
          setVisibleModal,
          handleDeleteTask,
          setVisibleInfo,
          setIdVisibleInfo,
          setTaskData,
          taskData,
        }}
      >
        <Space style={{ width: '100%', height: 40, justifyContent: 'start', alignItems: 'center' }}>
          <Button htmlType="button" type="primary" onClick={(e) => {
            e.preventDefault();
            showDrawer();
          }}>=</Button>
          {!get(sprintInfo, 'name') ? (
            <Spin />
          ) : (
            <Text ellipsis style={{ fontSize: 28, width: '92vw' }}>{get(sprintInfo, 'name')}</Text>
          )}
        </Space>
        <Suspense fallback={<p>...</p>}>
          <Menufilter />
        </Suspense>
        <hr />
        <div className="workflow" ref={workflowRef}>
          <ResizableBox
            className={`react-resizable_custom ${visibleInfo ? 'active' : ''}`}
            resizeHandles={['e']}
            minConstraints={[workflowRef?.current?.offsetWidth * 0.2 || window.innerWidth * 0.2, Infinity]}
            maxConstraints={[workflowRef?.current?.offsetWidth * 0.7 || window.innerWidth * 0.7, Infinity]}
            height={Infinity}
            draggableOpts={{ grid: [8, 8] }}
            width={lengthList}
          >
            <div className="work-list">
              <div className="work-list-body">
                <DragDropContext onDragEnd={onDragEndv2}>
                  {boardConfigMemo?.map(({ name, _id }:any) => (
                    <BoardConfig
                      key={_id}
                      dataBoardConfigItem={data[_id] ?? []}
                      // tasksAllBoard={tasksAllBoard}
                      // setTasksAllBoard={setTasksAllBoard}
                      name={name}
                      id={_id}
                    />
                  ))}
                  {/* <WithOrPermission permission={[POLICIES.WRITE_TODOLIST, POLICIES.ADMIN_TODOLIST]}> */}
                    <Button
                      // type="ghost"
                      htmlType="button"
                      onClick={() => handleCreateWork({ boardId: idBoard, sprintId, name: 'Default' })}
                    >
                      + Thêm danh mục
                    </Button>
                  {/* </WithOrPermission> */}
                </DragDropContext>
              </div>
            </div>
          </ResizableBox>
          <div className="view-port-info-container">
            {visibleInfo && (
              <div className="view-port-info-body">
                <Suspense fallback={<p>...loading</p>}>
                  {/* <TaskTabDetail taskData={taskData} setVisibleInfo={setVisibleInfo} idTask={idVisibleInfo} /> */}
                </Suspense>
              </div>
            )}
          </div>
        </div>
        <Drawer
          title={
            <p style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <Button type="dashed" href={`/work-flow/sprint/${idBoard}`}><ArrowLeftOutlined style={{ color: 'black', fontSize: 16 }} /></Button>
              &nbsp; Danh sách nhóm
            </p>
          }
          extra={<Button type="text" onClick={() => showDrawer(false)}><CloseOutlined /></Button>}
          placement="left"
          mask={true}
          maskStyle={{ background: 'transparent', width: '100vw' }}
          drawerStyle={{ background: '#333739' }}
          bodyStyle={{
            paddingLeft: 0,
            paddingRight: 0
          }}
          width={'max-content'}
          closable={false}
          maskClosable={true}
          onClose={() => showDrawer(false)}
          visible={visibleListBoard}
          getContainer={false}
          headerStyle={{
            padding: '10px 8px 10px 3px'
          }}
          style={{
            position: 'absolute',
            boxShadow: '0px 3px 3px #333'
          }}
        >
          <ResizableBox
            className={'react-resizable_custom react-resizable-list_board'}
            resizeHandles={['e']}
            minConstraints={[256, Infinity]}
            maxConstraints={[500, Infinity]}
            height={Infinity}
            width={300}
          >
            <Suspense fallback={<p>...</p>}>
              <MenuListBoard />
            </Suspense>
          </ResizableBox>
        </Drawer>
        <Modal
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          footer={false}
          closable={false}
          destroyOnClose
        >
          <Suspense fallback={<p>...</p>}>
            {/* <TaskForm /> */}
          </Suspense>
        </Modal>
      </FormTaskContext.Provider>
    </div>
  );
};

export default WorkList;
