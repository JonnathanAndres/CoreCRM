import React from 'react';
import { Layout as AntLayout } from 'antd';
import NavBar from './NavigationBar';
import styles from './Layout.css';

const { Header, Footer, Content } = AntLayout;

const Layout = (props) => {
  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>CoreCRM</div>
        <NavBar />
      </Header>
      <Content className={styles.content}>
        {props.children}
      </Content>
      <Footer className={styles.footer}>CoreCRM 版权所有 ©2017</Footer>
    </AntLayout>
  );
};

Layout.propTypes = {
};

export default Layout;
