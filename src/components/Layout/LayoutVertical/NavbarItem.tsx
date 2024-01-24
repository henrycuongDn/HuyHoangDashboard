import { Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCheckIsEllipsisActive } from '~/utils/hook';
type propsType = {
    path : string,
    label : string,
}
export default function NavbarItem({path,label}:propsType) : React.JSX.Element {
    const target = useRef(null);
    const isEllipsis = useCheckIsEllipsisActive(target)
    return (
        <Tooltip placement='topLeft' overlayClassName='layoutVertical--content__navbar__tooltip' color={'blue'} title={isEllipsis && label}>
        <NavLink
        ref={target}
        className={() => `layoutVertical--content__navbar__navLink`}
        to={path}
      >
        {label}
      </NavLink>
      </Tooltip>
    )
}