import { CaretDownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Modal, Typography } from "antd";
import { get } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ModalProfile from "~/components/common/TopBarDropDown/ModalProfile";
import AuthModule from "~/modules/auth";
import { authActions } from "~/modules/auth/redux/reducer";
import { useUpdateProfile } from "~/modules/user/user.hook";
type propsType = {};
type LayoutItemProps = {
    icon : React.JSX.Element,
    title : string,
    onClick? : () => void,
}
const LayoutItem = ({icon,title,onClick}:LayoutItemProps) => <div className="d-flex align-items-center gap-1">
    {icon}
    <Typography.Text onClick={onClick} className="fw-5">{title}</Typography.Text>
</div>

export default function ProfileMenu(props: propsType): React.JSX.Element {
  const [,onLogout] = AuthModule.hook.useLogout();
  const profile = AuthModule.hook.useGetProfile();
  const dispath = useDispatch();
  useEffect(() => {;
    dispath(authActions.getProfileRequest());
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const [isLoadingSubmit, handleUpdateProfile] = useUpdateProfile(onClose);

  const items: any[] = useMemo(() => [
    {
      label: <LayoutItem icon={<UserOutlined />} title="Hồ sơ cá nhân" /> ,
      key: "0",
      onClick: () => {setIsOpen(true)}
    },
    {
      type: "divider",
    },
    {
      label: <LayoutItem icon={<LogoutOutlined />} title="Đăng xuất" onClick={onLogout}/>,
      key: "1",
    },
  ],[]);
  return (
    <>
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <div className="profileBtn d-flex gap-1 align-items-center">
        <Avatar style={{backgroundColor : '#fff'}} src={get(profile,'avatar')}></Avatar>
        <Typography.Text>{get(profile,'profile.fullName','')}</Typography.Text>
        <CaretDownOutlined />
      </div>
    </Dropdown>
      <Modal
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        width={1020}
        footer={null}
        className="form-modal"
      >
        <ModalProfile handleUpdateProfile = {handleUpdateProfile} onCloseForm={() => setIsOpen(false)} isLoadingSubmit = {isLoadingSubmit} />
      </Modal>
    </>
  );
}
