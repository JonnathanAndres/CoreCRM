import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Index() {
  return (
    <div>用户管理</div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
