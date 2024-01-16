import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Tooltip, Typography } from 'antd';
import { CloseCircleFilled, FormOutlined } from '@ant-design/icons';
// import useNavigate from '~/hooks/useNavigate';
import { useNavigate } from 'react-router-dom';
// import { WithPermission } from '~/components/Common';
// import POLICIES from '~/constants/policy';

interface SprintCardProps {
  name: string;
  note: string;
  type: string;
  onCreate: (data: { name: string; note: string }) => void;
  onSave: (data: { name: string; note: string; id: string }) => void;
  onDelete: (data: { id: string }) => void;
  id: string;
  // boardId: string;
  style: any;
  userIsAdminforBoard: boolean;
}

const SprintCard: React.FC<SprintCardProps> = ({
  name,
  note,
  type,
  onCreate,
  onSave,
  onDelete,
  id,
  // boardId,
  style,
  userIsAdminforBoard,
}) => {
  const [note_, setNote] = useState<string>(note);
  const [name_, setName] = useState<string>(name);
  const [vis, setVis] = useState<boolean>(false);

  function handleSaveNote(data: { name: string; note: string }) {
    setVis(false);
    if (type === 'CREATE') {
      onCreate({ name: data.name, note: data.note });
    } else if (name_ !== name || note_ !== note) {
      onSave({ name: name_, note: note_, id });
    } else {
      console.log('out');
    }
  }

  useEffect(() => {
    setName(name);
    setNote(note);
  }, [name, note]);

  const validNote = (value: string) => {
    setVis(false);
  };

  if (type === 'CREATE') return <Create handleSaveNote={handleSaveNote} />;

  return (
    <Detail
      name_={name_}
      note_={note_}
      setName={setName}
      setNote={setNote}
      setVis={setVis}
      vis={vis}
      handleSaveNote={handleSaveNote}
      note={note}
      id={id}
      // boardId={boardId}
      onDelete={onDelete}
      style={style}
      userIsAdminforBoard={userIsAdminforBoard}
    />
  );
};

export default SprintCard;

interface CreateProps {
  handleSaveNote: (data: { name: string; note: string }) => void;
}

const Create: React.FC<CreateProps> = ({ handleSaveNote }) => {
  const [form] = Form.useForm();

  return (
    <div className="sprint-card-container">
      <Form
        form={form}
        onFinish={(value) => handleSaveNote(value)}
        layout="horizontal"
        labelCol={{ span: 24 }}
      >
        <Form.Item name={'name'} label={'Danh mục:'}>
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú:" name="note">
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 12 }}
            style={{ height: 'auto' }}
            placeholder="Lưu ý!"
          />
        </Form.Item>
        <Button htmlType="submit" type="primary" size="small">
          Tạo
        </Button>
      </Form>
    </div>
  );
};

interface DetailProps {
  name_: string;
  note_: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  // validNote: (value: string) => void;
  setVis: React.Dispatch<React.SetStateAction<boolean>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  handleSaveNote: (data: { name: string; note: string }) => void;
  vis: boolean;
  note: string;
  id: string;
  boardId?: string;
  onDelete: (data: { id: string }) => void;
  style: React.CSSProperties;
  userIsAdminforBoard: boolean;
}

const Detail: React.FC<DetailProps> = ({
  name_,
  note_,
  setName,
  setVis,
  setNote,
  handleSaveNote,
  vis,
  note,
  id,
  // boardId,
  onDelete,
  style,
  userIsAdminforBoard,
}) => {
  // const history = useHistory();
  const [focusName, setFocusName] = useState<boolean>(false);
const navigate = useNavigate()
  return (
    <div className="sprint-card-container detail" style={{ ...style }}>
      {/* <WithPermission permission={POLICIES.DELETE_TODOLIST}> */}
        <div className="sprint-card-close">
          <CloseCircleFilled
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete({ id });
            }}
          />
        </div>
      {/* </WithPermission> */}
      <div
        className="sprint-card-title"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (e.currentTarget.accessKey === 'true') {
            navigate(`/work-flow/detail/${id}`);
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        {!focusName ? (
          <>
            <Tooltip title={name_} mouseEnterDelay={1.2} overlayStyle={{ fontSize: 12 }}>
              <Typography.Title accessKey="true" className="sprint-card-title_link">
                {name_}
              </Typography.Title>
            </Tooltip>
            {/* {userIsAdminforBoard && ( */}
              <FormOutlined
                onClick={() => {
                  setVis(true);
                  setFocusName(true);
                }}
                color="blue"
                className="sprint-card-title_editor"
              />
            {/* )} */}
          </>
        ) : (
          <Input value={name_} onChange={(value) => setName(value.target.value)} style={{ width: '100%' }} />
        )}
      </div>

      <Input.TextArea
        onChange={(e) => setNote(e.target.value)}
        placeholder="Lưu ý!"
        value={note_}
        autoSize={{ minRows: 2, maxRows: 12 }}
        style={{ height: 'auto' }}
        readOnly={!userIsAdminforBoard}
        onFocus={() => {
          setVis(userIsAdminforBoard);
        }}
      ></Input.TextArea>
      {vis && (
        <Button.Group style={{ marginTop: 4 }}>
          <Button
            htmlType="button"
            onClick={() => {
              setFocusName(false);
              handleSaveNote({ name: name_, note: note_ });
            }}
            type="primary"
            size="small"
          >
            Lưu
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              setVis(false);
              setNote(note);
              setFocusName(false);
            }}
            type="dashed"
            size="small"
          >
            Huỷ
          </Button>
        </Button.Group>
      )}
    </div>
  );
};
