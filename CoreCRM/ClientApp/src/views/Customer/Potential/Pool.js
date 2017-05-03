import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Pool() {
  return (
    <div>客户管理/线索池</div>
  );
}

Pool.propTypes = {
};

export default connect()(Pool);
