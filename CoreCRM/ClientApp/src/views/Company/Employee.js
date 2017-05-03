import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Employee() {
  return (
    <div>办公/组织架构/用户管理</div>
  );
}

Employee.propTypes = {
};

export default connect()(Employee);
