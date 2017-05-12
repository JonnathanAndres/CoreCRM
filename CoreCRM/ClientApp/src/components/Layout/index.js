import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'dva';

/*
import Header from './Header';
import Menu from './Menu';
import Bread from './Bread';
import Sider from './Sider';
*/
import Footer from './Footer';
import styles from './Layout.less';
import '../../themes/index.less';

const Layout = ({ children, /* location, dispatch, */ app }) => {
  // const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app;
  const { siderFold, darkTheme, isNavbar } = app;

  /*
  const headerProps = {
    menu,
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout() {
      dispatch({ type: 'app/logout' })
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };

  const siderProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem(`/navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };

  const breadProps = {
    menu,
  };
  */

  const layoutClass = classnames(styles.layout,
    { [styles.fold]: !isNavbar && siderFold,
      [styles.withnavbar]: isNavbar });
  const asideClass = classnames(styles.sider, { [styles.light]: !darkTheme });

  return (
    <div className={layoutClass}>
      {!isNavbar ?
        <aside className={asideClass}>
          { /* <Sider {...siderProps} /> */ }
        </aside> : ''}
      <div className={styles.main}>
        { /* <Header {...headerProps} /> */ }
        { /* <Bread {...breadProps} location={location} /> */ }
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
  // location: PropTypes.object,
  // dispatch: PropTypes.func,
  // isNavBar: PropTypes.bool,
  app: PropTypes.object,
  // loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(Layout);
