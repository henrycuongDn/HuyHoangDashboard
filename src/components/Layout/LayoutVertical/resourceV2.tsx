// import { AppstoreFilled, AppstoreOutlined, ShopFilled,ApartmentOutlined } from "@ant-design/icons";
import {
  AppstoreFilled,
  AppstoreOutlined,
  DatabaseOutlined,
  DollarOutlined,
  HddOutlined,
  StockOutlined,
  HomeOutlined,
  TrophyOutlined,
  ApartmentOutlined,
  ShopFilled,
  MoneyCollectOutlined,
  BellFilled,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { PATH_APP } from "~/routes/allPath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import POLICIES, { GROUP_POLICY } from "~/modules/policy/policy.auth";
type MenuItem = Required<MenuProps>["items"][number];
function getItem({
  label,
  icon,
  children,
  path,
  key,
  permission,
}: ItemType): any {
  return {
    key,
    icon,
    children,
    permission,
    label: path ? (
      <NavLink
        className={() => `layoutVertical--content__navbar__navLink`}
        to={path}
      >
        {label}
      </NavLink>
    ) : (
      label
    ),
  } as MenuItem;
}
type ItemType = {
  label: string;
  icon?: React.ReactNode;
  children?: ItemType[];
  path?: string;
  key: string;
  permission?: any;
};
const permissionOfSetup = [
  POLICIES.READ_PRODUCTGROUP,
  POLICIES.READ_MANUFACTURER,
  POLICIES.READ_RANKING,
  POLICIES.READ_UNIT,
  POLICIES.READ_MEDICINE,
  POLICIES.READ_CONFIGDISCOUNT,
  POLICIES.READ_AREACONFIGURATION,
  POLICIES.READ_CONFIGBASESALARY,
  POLICIES.READ_CONFIGBENEFIT,
  POLICIES.READ_SALESGROUP
];
const permissionPharma = [
  POLICIES.READ_PHARMAPROFILE,
  POLICIES.READ_BILL,
  POLICIES.READ_QUOTATION,
  POLICIES.WRITE_QUOTATION,
  POLICIES.READ_CUMULATIVEEVENT,
  POLICIES.READ_VOUCHER,
];

const permissionSupplier = [
  POLICIES.READ_SUPPLIER,
  POLICIES.READ_VOUCHER,
  POLICIES.READ_CUMULATIVESALESUPPLIER,
];
export const resource: ItemType[] = [
  {
    label: "WorldPharmaVN",
    key: "WorldPharmaVN",
    icon: <i className="fa-solid fa-earth-americas"></i>,
    permission: [POLICIES.READ_PRODUCT, ...permissionOfSetup],
    children: [
      {
        label: "Danh sách sản phẩm",
        path: PATH_APP.productAll.root,
        key: PATH_APP.productAll.root,
        icon: <i className="fa-solid fa-capsules"></i>,
        permission: [POLICIES.READ_PRODUCT],
      },
      {
        label: "Cài đặt",
        key: "WorldPharmaVN-setting",
        icon: <i className="fa-solid fa-gear"></i>,
        permission: [...permissionOfSetup],
        children: [
          {
            label: "Nhóm sản phẩm",
            path: PATH_APP.worldPharma.productGroup,
            key: PATH_APP.worldPharma.productGroup,
            icon: <HddOutlined />,
            permission: [POLICIES.READ_PRODUCTGROUP],
          },
          {
            label: "Danh sách hãng sản xuất",
            path: PATH_APP.worldPharma.manufacturer,
            key: PATH_APP.worldPharma.manufacturer,
            icon: <HomeOutlined />,
            permission: [POLICIES.READ_MANUFACTURER],
          },
          {
            label: "Xếp hạng nhà cung cấp",
            path: PATH_APP.worldPharma.ranking,
            key: PATH_APP.worldPharma.ranking,
            icon: <TrophyOutlined />,
            permission: [POLICIES.READ_RANKING],
          },
          {
            label: "Đơn vị tính",
            path: PATH_APP.worldPharma.unit,
            key: PATH_APP.worldPharma.unit,
            icon: <DollarOutlined />,
            permission: [POLICIES.READ_UNIT],
          },
          {
            label: "Danh sách thuốc",
            path: PATH_APP.worldPharma.medicine,
            key: PATH_APP.worldPharma.medicine,
            icon: <DatabaseOutlined />,
            permission: [POLICIES.READ_MEDICINE],
          },
          {
            label: "Cấu hình giảm giá",
            path: PATH_APP.configDiscount.root,
            key: PATH_APP.configDiscount.root,
            permission: [POLICIES.READ_CONFIGDISCOUNT],
            icon: <i className="fa-solid fa-percent"></i>,
          },
          {
            label: "Thông báo tự động",
            icon: <BellFilled />,
            path: PATH_APP.botNotification.root,
            key: PATH_APP.botNotification.root,
            permission: [POLICIES.READ_NOTIFICATIONBOTMANAGER],
          },
          {
            label: "Nhóm bán hàng",
            icon: <i className="fa-solid fa-chart-area"></i>,
            path: PATH_APP.salesGroup.root,
            key: PATH_APP.salesGroup.root,
            permission: [POLICIES.READ_SALESGROUP],
          },
          {
            label: "Cấu hình lương vùng",
            icon: <i className="fa-solid fa-money-bill-trend-up"></i>,
            path: PATH_APP.baseSalary.root,
            key: PATH_APP.baseSalary.root,
            permission: [POLICIES.READ_CONFIGBASESALARY],
          },
          {
            label: "Cấu hình hoa hồng",
            icon: <i className="fa-brands fa-pagelines"></i>,
            path: PATH_APP.benefitConfiguration.root,
            key: PATH_APP.benefitConfiguration.root,
            permission: [POLICIES.READ_CONFIGBENEFIT],
          },
        ],
      },
    ],
  },

  // Nhà cung cấp
  {
    label: "Nhà cung cấp",
    icon: <i className="fa-solid fa-cubes"></i>,
    key: "supplier",
    permission: [...permissionSupplier],
    children: [
      {
        label: "Danh sách nhà cung cấp",
        path: PATH_APP.supplier.root,
        key: PATH_APP.supplier.root,
        permission: [POLICIES.READ_SUPPLIER],
      },
      {
        label: "Đơn hàng",
        path: PATH_APP.orderSupplier.root,
        key: PATH_APP.orderSupplier.root,
        permission: [POLICIES.READ_BILL],
      },
      {
        label: "Doanh số tích luỹ",
        path: PATH_APP.report.supplier,
        key: PATH_APP.report.supplier,
        permission: [POLICIES.READ_CUMULATIVESALESUPPLIER],
      },

      {
        label: "Phiếu",
        // icon: <MoneyCollectOutlined />,
        path: PATH_APP.vouchers.supplier,
        key: PATH_APP.vouchers.supplier,
        permission: [POLICIES.READ_VOUCHER],
      },
    ],
  },

  // Nhà thuốc
  {
    label: "Nhà thuốc",
    icon: <i className="fa-solid fa-house-chimney-medical"></i>,
    key: "pharmacy",
    permission: [...permissionPharma],
    children: [
      {
        label: "Danh sách nhà thuốc",
        path: PATH_APP.pharmacy.root,
        key: PATH_APP.pharmacy.root,
        permission: [POLICIES.READ_PHARMAPROFILE],
      },
      {
        label: "Đơn hàng",
        path: PATH_APP.bill.root,
        key: PATH_APP.bill.root,
        permission: [POLICIES.READ_BILL],
      },
      {
        label: "Đơn hàng tạm",
        path: PATH_APP.quotation.root,
        key: PATH_APP.quotation.root,
        permission: [POLICIES.READ_QUOTATION],
      },
      {
        label: "Tạo đơn hàng tạm",
        path: PATH_APP.bill.create,
        key: PATH_APP.bill.create,
        permission: [POLICIES.WRITE_QUOTATION],
      },
      {
        label: "Luỹ kế mặt hàng",
        path: PATH_APP.bill.lk,
        key: PATH_APP.bill.lk,
        permission: [POLICIES.READ_CUMULATIVEEVENT],
      },
      {
        label: "Phiếu",
        // icon: <MoneyCollectOutlined />,
        path: PATH_APP.vouchers.pharmacy,
        key: PATH_APP.vouchers.pharmacy,
        permission: [POLICIES.READ_VOUCHER],
      },
      {
        label: "Hợp đồng khoán",
        path: PATH_APP.freelanceContractPharmacy.root,
        key: PATH_APP.freelanceContractPharmacy.root,
        permission: [POLICIES.READ_CONTRACTPHARMACY],
      },
    ],
  },

  // Chi nhánh
  {
    label: "Chi nhánh",
    key: "branch",
    permission: [POLICIES.READ_BRANCH],
    children: [
      {
        label: "Danh sách chi nhánh",
        path: PATH_APP.branch.root,
        key: PATH_APP.branch.root,
        permission: [POLICIES.READ_BRANCH],
      },
    ],
    icon: <i className="fa-solid fa-code-branch"></i>,
  },

  // Báo cáo
  {
    label: "Báo cáo",
    key: "report",
    permission: [POLICIES.READ_REPORTSALARY],
    children: [
      {
        label: "Báo cáo nhân viên",
        path: PATH_APP.report.employee,
        key: PATH_APP.report.employee,
        permission: [POLICIES.READ_REPORTSALARY],
      },
    ],
    icon: <i className="fa-solid fa-code-branch"></i>,
  },

  {
    label: "Quản lý công việc",
    key: "todoList",
    icon: <i className="fa-solid fa-clipboard-list"></i>,
    permission: [POLICIES.READ_TODOLIST, POLICIES.READ_TODOCONFIGSTATUS],
    children: [
      {
        label: "Quản lý công việc",
        // key: "statusConfig",
        icon: <ApartmentOutlined />,
        path: PATH_APP.todoList.workBoard,
        key: PATH_APP.todoList.workBoard,
        permission: [POLICIES.READ_TODOLIST],
      },
      {
        label: "Cấu hình trạng thái",
        // key: "statusConfig",
        icon: <AppstoreFilled />,
        path: PATH_APP.todoList.statusConfig,
        key: PATH_APP.todoList.statusConfig,
        permission: [POLICIES.READ_TODOCONFIGSTATUS],
      },
    ],
  },

  //Nhân viên
  {
    label: "Nhân viên",
    icon: <i className="fa-solid fa-users"></i>,
    path: PATH_APP.employee.root,
    key: PATH_APP.employee.root,
    permission: [POLICIES.READ_EMPLOYEE , POLICIES.READ_EMPLOYEEGROUP, POLICIES.READ_EMPLOYEEPOSITION],
  },
  //Người dùng
  {
    label: "Người dùng",
    icon: <i className="fa-solid fa-user"></i>,
    path: PATH_APP.user.root,
    key: PATH_APP.user.root,
    permission: [POLICIES.READ_USER, POLICIES.READ_USERGROUP],
  },
  {
    label: "Quản lý chi phí",
    icon: <FundProjectionScreenOutlined />,
    path: PATH_APP.costManagement.root,
    key: PATH_APP.costManagement.root,
    permission: [POLICIES.READ_SHIPPINGCOST],
  },
];

//Required permission is string[][];
const NavbarItems = resource.map((first) => {
  if (first.children?.length) {
    const newChildFirst = first.children.map((second) => {
      if (second.children?.length) {
        const newChildSecond = second.children.map((third) => getItem(third));
        return getItem({ ...second, children: newChildSecond });
      } else {
        return getItem(second);
      }
    });
    return getItem({ ...first, children: newChildFirst });
  } else {
    return getItem(first);
  }
});
export default NavbarItems;
