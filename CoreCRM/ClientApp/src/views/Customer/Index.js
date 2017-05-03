import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Index() {
  return (
    <div>客户管理/客户视图</div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
