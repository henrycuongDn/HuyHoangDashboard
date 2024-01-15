
function path(root:any, sublink:any) {
    return `${root}${sublink}`;
  }
  
  const ROOTS = {
    auth: '/',
    app: ''
  };
export const PATH_APP = {
    root: ROOTS.app,
  
    main: {
      root: path(ROOTS.app, '/dashboard'),
    },
    auth : {
      login: path(ROOTS.app, '/login'),
    },

    worldPharma : {
      productConfig: path(ROOTS.app, '/productConfig'),
    },

    supplier : {
      root: path(ROOTS.app, '/supplier'),
    },

    branch : {
      root: path(ROOTS.app, '/branch'),
    },
    pharmacy : {
      root:  path(ROOTS.app, '/pharmacy'),
      detail: path(ROOTS.app, '/pharmacy/:id'),
    },
    
    employee: {
        root: path(ROOTS.app, '/employee'),
    },
    user: {
      root: path(ROOTS.app, '/user/*'),
    },
  
  };