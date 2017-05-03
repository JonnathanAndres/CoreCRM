import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Add() {
  return (
    <div>客户管理/添加联系人</div>
  );
}

Add.propTypes = {
};

export default connect()(Add);
