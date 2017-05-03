import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function AddDepartment() {
  return (
    <div>办公/组织架构/添加部门</div>
  );
}

AddDepartment.propTypes = {
};

export default connect()(AddDepartment);
