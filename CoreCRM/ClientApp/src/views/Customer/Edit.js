import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Edit() {
  return (
    <div>客户管理/编辑客户</div>
  );
}

Edit.propTypes = {
};

export default connect()(Edit);
