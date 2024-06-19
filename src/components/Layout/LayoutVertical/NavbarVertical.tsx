import { ConfigProvider, Menu, MenuProps, Spin } from 'antd';
import React, {  useState , useEffect} from 'react';
// import { resource } from './resourceV2';
import { useGetProfile } from '~/modules/auth/auth.hook';
import { isMatchPolicy, useUserPolicy } from '~/modules/policy/policy.hook';
import NavbarItem from './NavbarItem';
import { keys } from 'lodash';
import { resource } from './resourceV3';


/**
 * 
 * FIXME: ACTIVE NAVBAR IS NOT WORKING
 */

type MenuItem = Required<MenuProps>["items"][number];
type ItemType = {
  label: string;
  icon?: React.ReactNode;
  children?: ItemType[];
  path?: string;
  key: string;
  permission?: any; 
};

function getItem({ label, icon, children, path, key, permission }: ItemType): any {
  return {
    key,
    icon,
    children,
    permission,
    label: <NavbarItem label={label} path={path}/>
    
  } as MenuItem 
};
const NavbarVertical: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);

  const profile = useGetProfile();
  const [isLoadingPolicy, , policies] = useUserPolicy();

  const [filteredResource,setFilteredResource]:any = useState<any[]>([]);
  useEffect(() => {
    const checkPermission = (permission: any): boolean => {
      if (!permission || profile?.user?.isSuperAdmin) return true;
      
      for (const permissionItem of permission) {
        if (isMatchPolicy(policies, permissionItem)) {
          return true;
        };
      };
      return false;
    };

    const filterItems = (items: ItemType[]) => {
      return items.filter((item: ItemType) => {
        if ( !!item?.children?.length) {
          item.children = filterItems(item.children);
        };
        return checkPermission(item?.permission);
        
      });
    };
    if(profile?.user?.isSuperAdmin || (policies && !!keys(policies).length)){
      const filteredResource = filterItems(resource);
      setFilteredResource(filteredResource)
    };
  }, [policies, profile]);
  
  function loopRenderNav (element: typeof resource[number]){
    const render = element
    if(element.children?.length){
        render.children = element.children.map(loopRenderNav)
    }
    return getItem(render)
  }
    const NewNavbarItems = filteredResource.map(loopRenderNav)
    
    return (
    <div className='layoutVertical--content__navbar'>
      {isLoadingPolicy && <Spin className='layoutVertical--content__navbar__loading' tip="Đang lấy dữ liệu phân quyền"/>}
      <div className='layoutVertical--content__navbar__wrapMenu'>
      <ConfigProvider theme={{
        components : {
          Menu : {
            itemMarginInline : 0,
            itemMarginBlock : 0,
          }
        }
      }}>
      <Menu

      className='layoutVertical--content__navbar__wrapMenu__menu'
      mode="inline"
      inlineCollapsed={collapsed}
      items={NewNavbarItems}
      theme='dark'
      />
      </ConfigProvider>
      </div>
    </div>


  );
};

export default NavbarVertical;
