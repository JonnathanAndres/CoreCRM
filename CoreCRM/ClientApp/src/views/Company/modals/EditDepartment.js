import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function EditDepartment() {
  return (
    <div>办公/组织架构/修改部门</div>
  );
}

EditDepartment.propTypes = {
};

export default connect()(EditDepartment);
