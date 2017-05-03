import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function AddEmployee() {
  return (
    <div>办公/组织架构/添加用户</div>
  );
}

AddEmployee.propTypes = {
};

export default connect()(AddEmployee);
