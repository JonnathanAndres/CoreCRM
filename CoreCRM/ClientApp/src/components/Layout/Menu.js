import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const Menus = ({ siderFold,
                 darkTheme,
                 location,
                 handleClickNavMenu,
                 navOpenKeys,
                 changeOpenKeys,
                 menu }) => {
  const selectedKeys = [];
  const getMenus = (menuTree) => {
    function recursive(item, parentRoute) {
      if (item.children) {
        return (
          <Menu.SubMenu
            key={item.id}
            title={<span>
              {item.icon && <Icon type={item.icon} />}
              {item.name}
            </span>}
          >
            {item.children.map(child => recursive(child, item.route))}
          </Menu.SubMenu>
        );
      } else {
        const re = new RegExp(`^${location.pathname}`);
        if (re.test(item.route)) {
          selectedKeys.push(JSON.stringify(item.id));
        }

        return (
          <Menu.Item
            key={item.id}
          >
            <Link to={parentRoute ? parentRoute + item.route : item.route}>
              {item.icon && <Icon type={item.icon} />}
              {item.name}
            </Link>
          </Menu.Item>
        );
      }
    }
    return recursive(menuTree);
  };

  const menuItems = getMenus(menu);

  const menuProps = Object.assign({
    selectedKeys,
    mode: (siderFold ? 'vertical' : 'inline'),
    theme: (darkTheme ? 'dark' : 'light'),
  }, siderFold ? {} : {
    openKeys: navOpenKeys,
    onOpenChange: changeOpenKeys,
  });

  return (
    <Menu
      {...menuProps}
      onClick={handleClickNavMenu}
    >
      {menuItems}
    </Menu>
  );
};

Menus.propTypes = {
  menu: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

export default Menus;
