import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Checkbox, Button, Icon } from 'antd';
import styles from './Login.css';

function Login() {
  return (
    <Row>
      <Col span={9}>&nbsp;</Col>
      <Col span={6}>
        <Form layout="vertical" className={styles.loginForm}>
          <Form.Item>
            <Input prefix={<Icon type="user" className={styles.icon} />} placeholder="用户名" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="lock" className={styles.icon} />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Checkbox>本周内不再登录</Checkbox>
            <a className={styles.loginFormForgot} href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>登录</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={9}>&nbsp;</Col>
    </Row>
  );
}

Login.propTypes = {
};

export default connect()(Login);
