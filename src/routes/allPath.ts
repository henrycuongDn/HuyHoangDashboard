
function path(root: any, sublink: any) {
  return `${root}${sublink}`;
}

const ROOTS = {
  auth: "/",
  app: "",
};
export const PATH_APP = {
  root: ROOTS.app,

  main: {
    root: path(ROOTS.app, "/dashboard"),
  },
  auth: {
    login: path(ROOTS.app, "/login"),
  },

  worldPharma: {
    productGroup: path(ROOTS.app, "/productGroup"),
    manufacturer: path(ROOTS.app, "/manufacturer"),
    ranking: path(ROOTS.app, "/ranking"),
    unit: path(ROOTS.app, "/unit"),
    medicine: path(ROOTS.app, "/medicine"),
  },

  supplier: {
    root: path(ROOTS.app, "/supplier"),
    revenue: path(ROOTS.app, "/supplier-revenue"),
  },
  revenueSupplier: {
    root: path(ROOTS.app, "/supplier-revenue"),
    revenue: path(ROOTS.app, "/supplier-revenue/:id"),
    revenueDetail: path(ROOTS.app, "/supplier-revenue/:id/detail/:revenueId"),
    revenueAll: path(ROOTS.app, "/supplier-revenue-all/:id"),
  },

  branch: {
    root: path(ROOTS.app, "/branch"),
  },

  product: {
    root: path(ROOTS.app, "/product"),
    edit: path(ROOTS.app, "/product/:supplierId"),
  },
  todoList: {
    statusConfig: path(ROOTS.app, "/statusConfig"),
    workBoard: path(ROOTS.app, "/work-board"),
    workSprint: path(ROOTS.app, "/work-board/sprint/:boardId"),
    workList: path(ROOTS.app, "/work-board/detail/:sprintId"),
    workTask: path(ROOTS.app, "/work-task-item/:taskId"),
  },
  employee: {
    root: path(ROOTS.app, "/employee"),
  },

  configDiscount: {
    root: path(ROOTS.app, "/config-discount"),
  },
  pharmacy: {
    root: path(ROOTS.app, "/pharmacy"),
    detail: path(ROOTS.app, "/pharmacy/:id"),
  },
  bill: {
    root: path(ROOTS.app, "/bill"),
    update: path(ROOTS.app, "/bill/:id"),
    create: path(ROOTS.app, "/bill/create"),
    quotation: path(ROOTS.app, "/quotation"),
    lk: path(ROOTS.app, "/lk"),
  },

  quotation: {
    root: path(ROOTS.app, "/quotation"),
    update: path(ROOTS.app, "/quotation/:id"),
    create: path(ROOTS.app, "/quotation/create"),
  },
  vouchers: {
    root: path(ROOTS.app, "/vouchers"),
    supplier: path(ROOTS.app, "/vouchers-supplier"),
    pharmacy: path(ROOTS.app, "/vouchers-pharmacy"),
  },

     user: {
      root: path(ROOTS.app, '/user/*'),
   
    },
     productAll: {
      root: path(ROOTS.app, '/products-list'),
    },
    

    report: {
      supplier: path(ROOTS.app, '/report/supplier'),
    },
  
    botNotification : {
      root:  path(ROOTS.app, '/bot-notification'),
      // update: path(ROOTS.app, '/bot-notification/:id'),
      create: path(ROOTS.app, '/bot-notification/create'),
    },


  orderSupplier: {
    root: path(ROOTS.app, "/order-supplier"),
    create: path(ROOTS.app, "/order-supplier/create"),
    update: path(ROOTS.app, "/order-supplier/:id"),
  },
  freelanceContractPharmacy: {
    root: path(ROOTS.app, "/freelance-contract-pharmacy"),
  },
  costManagement:{
    root: path(ROOTS.app, "/cost-management"),
    create: path(ROOTS.app, "/cost-management/create"),
    update: path(ROOTS.app, "/cost-management/:id"),
  },

  salesGroup : {
    root:  path(ROOTS.app, '/area-configuration'),
  },
  baseSalary : {
    root:  path(ROOTS.app, '/base-salary'),
  },
  benefitConfiguration : {
    root:  path(ROOTS.app, '/benefit-configuration'),
  },
};
