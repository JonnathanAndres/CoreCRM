import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function MoveDepartment() {
  return (
    <div>办公/组织架构/移动部门</div>
  );
}

MoveDepartment.propTypes = {
};

export default connect()(MoveDepartment);
