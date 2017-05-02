import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import NavBar from '../../components/NavigationBar';
import styles from './IndexView.css';
import sharedStyles from '../Shared/Shared.css';

const { Header, Footer, Content } = Layout;

function IndexView() {
  return (
    <Layout className="layout">
      <Header className={sharedStyles.header}>
        <div className={sharedStyles.logo}>CoreCRM</div><NavBar />
      </Header>
      <Content className={styles.content}>&nbsp;
      </Content>
      <Footer className={sharedStyles.footer}>CoreCRM 版权所有 ©2017</Footer>
    </Layout>
  );
}

IndexView.propTypes = {
};

export default connect()(IndexView);
