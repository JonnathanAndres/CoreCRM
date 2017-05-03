import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function AddPosition() {
  return (
    <div>办公/组织架构/添加岗位</div>
  );
}

AddPosition.propTypes = {
};

export default connect()(AddPosition);
