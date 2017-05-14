import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Popover } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less';
import Menus from './Menu';

const SubMenu = Menu.SubMenu;

const Header = ({ user,
                  logout,
                  switchSider,
                  siderFold,
                  isNavbar,
                  isDev,
                  menuPopoverVisible,
                  location,
                  switchMenuPopover,
                  navOpenKeys,
                  changeOpenKeys,
                  mainMenus,
                  sideMenus }) => {
  const handleClickMenu = e => e.key === 'logout' && logout();
  const menusProps = {
    sideMenus,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  };

  const menus = mainMenus.map((menu, index) => {
    return (
      <Menu.Item key={`main-menu-${index}`}>
        {isDev ?
          <Link to={menu.route}>{menu.icon && <Icon type={menu.icon} />} {menu.name}</Link> :
          <a href={menu.route}>{menu.icon && <Icon type={menu.icon} />} {menu.name}</a>}
      </Menu.Item>
    );
  });

  return (
    <div className={styles.header}>
      {isNavbar ?
        <Popover
          placement="bottomLeft"
          onVisibleChange={switchMenuPopover}
          visible={menuPopoverVisible}
          overlayClassName={styles.popovermenu}
          trigger="click"
          content={<Menus {...menusProps} />}
        >
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover> :
        <div>
          <div style={{ display: 'inline-block' }} className={styles.button} onClick={switchSider}>
            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
          </div>
          <Menu mode="horizontal">
            {menus}
          </Menu>
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span><Icon type="user" />{user.username || 'guest'}</span>}
          >
            <Menu.Item key="settings">设置</Menu.Item>
            <Menu.Item key="logout">退出</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

Header.propTypes = {
  mainMenus: PropTypes.array,
  sideMenus: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  isDev: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

export default Header;
