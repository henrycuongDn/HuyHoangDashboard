// import { userGroup } from '~/modules/userGroup';
import { concat, forIn, get } from 'lodash';
import { PoliciesType, ResourceType } from './policy.modal';

const branch = 'branch';
const company = 'company';
const employee = 'employee';
const user = 'user';
const userGroup = 'userGroup';
const pharmacy = 'pharmacy';
const manuFacturer = 'manufacturer';
const unit = 'unit';
const productGroup='productGroup';
const ranking = 'ranking';
const medicine = 'medicine';
const voucher = 'voucher';
const statusVoucher = 'statusVoucher';
const historyVoucher = 'historyVoucher';
// Nhà cung cấp
const supplier = 'supplier';
const debt = 'debt';

// Sản phẩm Nhà cung cấp
const product = 'product';

// Đơn hàng
const bill = 'bill';

// Đơn hàng tạm
const quotation = 'quotation';

const RESOURCES = [
  branch,
  // company,
  employee,
  user,
  userGroup,
  // pharmacy,
  manuFacturer,
  unit,
  ranking,
  // productGroup
  productGroup,
  //
  medicine,
  
  bill,
  quotation,

  //VOUCHER
  voucher,
  statusVoucher,
  historyVoucher,
  supplier,
  product,
  debt,

];

//ACTIONS
const READ = 'read';
const WRITE = 'write';
const UPDATE = 'update';
const DELETE = 'delete';
const DOWNLOAD = 'download';
const ADMIN = 'admin';


export const ACTIONS = [READ, WRITE, UPDATE, DELETE, DOWNLOAD, ADMIN];


const POLICIES : PoliciesType = RESOURCES.reduce((policies, resource) => {
  const policy = ACTIONS.reduce(
    (actions, action) => ({
      ...actions,
      [`${action.toUpperCase()}_${resource.toUpperCase()}`]: [resource, action]
    }),
    {
      [resource.toUpperCase()]: [resource]
    }
  );

  return {
    ...policies,
    ...policy
  };
}, {} as PoliciesType);

export default POLICIES;
const RESOURCE = (): ResourceType => {
  const GROUP_WHSETTING : string[] = [];
  
  const GROUP_USER : string[] = [
    user,
    userGroup
  ];
  const GROUP_EMPLOYEE : string[] = [
    employee
  ];
  const GROUP_MANUFACTURER : string[] = [
    manuFacturer
  ];
  const UNIT : string[] = [
    unit
  ];
  const MEDICINE : string[] = [
    medicine
  ];
  const GROUP_PRODUCTGROUP : string[] = [
    productGroup
  ];
  const GROUP_RANKING : string[] = [
    ranking
  ];
  const GROUP_VOUCHER: string[] = [
    voucher,
    statusVoucher,
    historyVoucher
  ]

  const GROUP_SUPPLIER: string[] = [
    supplier,
    product,
    debt,
  ];

  const GROUP_BILL : string[] = [
    bill,
    quotation,
  ];

  return {
    GROUP_USER,
    GROUP_EMPLOYEE,
    GROUP_WHSETTING,
    GROUP_MANUFACTURER,
    UNIT,
    GROUP_PRODUCTGROUP,
    GROUP_RANKING,
    MEDICINE,
    GROUP_BILL,
    GROUP_VOUCHER,
    GROUP_SUPPLIER,
  };
};

/**
 *
 * @param {String} action CORE_ACTION [READ, WRITE, UPDATE, DELETE]
 * @returns {Array} [POLICIES.action_resources]
 */
export const GROUP_POLICY : any = (action: any): void => {
  return forIn(RESOURCE(), (value, key, object : any) => {
    object[key] = [];
    // if (Array.isArray(value)) {
      value.forEach((keyPermission: string | undefined) => {
        if (keyPermission) {
          object[key].push(
            get(POLICIES, `${action}_${keyPermission.toUpperCase()}`)
          );
        }
      });
    // }
  });
};
export const CORE_ACTION = {
  READ: 'READ',
  WRITE: 'WRITE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  ADMIN: 'ADMIN',
  DOWNLOAD: 'DOWNLOAD',
};

