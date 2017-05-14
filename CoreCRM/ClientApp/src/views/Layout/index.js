/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'dva';
import { Header, Sider, Bread, Footer } from '../../components/Layout';
import styles from './Layout.less';
import '../../themes/index.less';

const Layout = ({ children, location, dispatch, app }) => {
  const {
    user,
    menuPopoverVisible,
    siderFold,
    darkTheme,
    isNavbar,
    isDev,
    mainMenus,
    sideMenus,
    navOpenKeys,
    breads } = app;

  const headerProps = {
    mainMenus,
    user,
    siderFold,
    location,
    isNavbar,
    isDev,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' });
    },
    logout() {
      dispatch({ type: 'app/logout' });
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' });
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };

  const siderProps = {
    sideMenus,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'app/switchTheme' });
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };

  const breadProps = {
    breads,
  };

  // Define classes
  const asideClass = classnames(styles.sider, { [styles.light]: !darkTheme });
  const layoutClass = classnames(styles.layout,
    { [styles.fold]: !isNavbar && siderFold,
      [styles.withnavbar]: isNavbar });

  return (
    <div className={layoutClass}>
      {!isNavbar ?
        <aside className={asideClass}>
          <Sider {...siderProps} />
        </aside> : ''}
      <div className={styles.main}>
        <Header {...headerProps} />
        <Bread {...breadProps} location={location} />
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  // loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(Layout);
