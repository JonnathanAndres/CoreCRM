import React from 'react';
// import PropTypes from 'prop-types';
import { Breadcrumb /* , Icon */ } from 'antd';
import { Link } from 'dva/router';
import styles from './Bread.less';

const Bread = (/* { menu } */) => {
  // 递归查找父级

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/Home">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Home">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/Home">Home</Link></Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

Bread.propTypes = {
};

export default Bread;
