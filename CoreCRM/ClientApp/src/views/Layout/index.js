/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Badge, Menu, Icon, Layout as AntdLayout } from 'antd';
import styles from './Layout.less';
import { config } from '../../utils';
import '../../themes/index.less';

const { Header, Content, Footer, Sider } = AntdLayout;


const Layout = ({ children, dispatch, app }) => {
  const { siderCollapsed, user, isDev } = app;
  const toggle = () => {
    dispatch({ type: 'app/toggleSider' });
  };

  const mainMenus = app.mainMenus.map((menu) => {
    return (
      <Menu.Item key={`main-menu-${menu.name}`}>
        {isDev ?
          <Link to={menu.route}>{menu.icon && <Icon type={menu.icon} />} {menu.name}</Link> :
          <a href={menu.route}>{menu.icon && <Icon type={menu.icon} />} {menu.name}</a>}
      </Menu.Item>
    );
  });
  const handleMainMenuClick = (e) => {
    dispatch({ type: 'app/changeMainMenu', key: e.key });
  };

  const { sideMenus, selectedKeys: selectedSideMenuKeys } = ((menuTree) => {
    const selectedKeys = [];
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
    return { sideMenus: recursive(menuTree), selectedKeys };
  })(app.sideMenus);

  return (<AntdLayout>
    {/* TODO: show different sider in responsive */}
    <Sider
      breakpoint="lg"
      collapsible
      defaultCollapsed={siderCollapsed}
      collapsed={siderCollapsed}
      trigger={null}
      className="light"
    >
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={selectedSideMenuKeys}
        defaultOpenKeys={['1']}
      >
        {sideMenus}
      </Menu>
    </Sider>
    <AntdLayout>
      <Header className="light">
        <div className={styles.button} onClick={toggle}>
          <Icon type={siderCollapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <div style={{ display: 'inline-block' }}>
          <Menu
            onClick={handleMainMenuClick}
            selectedKeys={app.selectedMainMenuKeys}
            mode="horizontal"
          >
            {mainMenus}
          </Menu>
        </div>
        <div className={styles.rightWarpper}>
          <div className={styles.button}>
            <Badge count={5}>
              <Icon type="mail" />
            </Badge>
          </div>
          <div className={styles.button}>
            <Icon type="mail" />
          </div>
          <Menu mode="horizontal">
            <Menu.SubMenu
              style={{
                float: 'right',
              }}
              title={<span><Icon type="user" />{user.username || 'guest'}</span>}
            >
              <Menu.Item key="settings">设置</Menu.Item>
              <Menu.Item key="logout">退出</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        CoreCRM  &copyright; 2017
      </Footer>
    </AntdLayout>
  </AntdLayout>);
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  // loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(Layout);
