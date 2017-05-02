import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Form, Input, Button, Icon, Checkbox } from 'antd';
import NavBar from '../../components/NavigationBar';
import styles from './IndexView.css';
import sharedStyles from '../Shared/Shared.css';

const { Header, Footer, Content } = Layout;

function IndexView({ dispatch }) {
  return (
    <Layout className="layout">
      <Header className={sharedStyles.header}>
        <div className={sharedStyles.logo}>CoreCRM</div><NavBar />
      </Header>
      <Content className={styles.content}>
        <Row>
          <Col span={18}>&nbsp;</Col>
          <Col span={6}>
            <Form onSubmit={dispatch('login')} layout="vertical" className="login-form">
              <Form.Item>
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
              </Form.Item>
              <Form.Item>
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer className={sharedStyles.footer}>CoreCRM 版权所有 ©2017</Footer>
    </Layout>
  );
}

IndexView.propTypes = {
};

export default connect()(IndexView);
