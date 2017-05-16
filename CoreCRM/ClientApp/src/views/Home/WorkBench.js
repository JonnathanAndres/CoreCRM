import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function WorkBench() {
  return (
    <div>工作动态，或者叫工作台</div>
  );
}

WorkBench.propTypes = {
};

export default connect()(WorkBench);
