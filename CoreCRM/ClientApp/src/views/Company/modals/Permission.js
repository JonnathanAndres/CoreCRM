import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Permission() {
  return (
    <div>办公/组织架构/授权</div>
  );
}

Permission.propTypes = {
};

export default connect()(Permission);
