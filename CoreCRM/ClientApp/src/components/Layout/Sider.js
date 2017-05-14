import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Switch } from 'antd';
import { config } from '../../utils';
import Menus from './Menu';
// TODO: Why the import in less not work?
import styles from '../../views/Layout/Layout.less';

const Sider = ({ siderFold,
                 darkTheme,
                 location,
                 changeTheme,
                 navOpenKeys,
                 changeOpenKeys,
                 sideMenus }) => {
  const menusProps = {
    menu: sideMenus,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  };
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        {siderFold ? '' : <span>{config.name}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" />Switch Theme</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="Dark" unCheckedChildren="Light" />
      </div> : ''}
    </div>
  );
};

Sider.propTypes = {
  sideMenus: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

export default Sider;
