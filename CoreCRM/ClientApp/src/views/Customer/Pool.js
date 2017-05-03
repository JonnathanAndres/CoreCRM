import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Pool() {
  return (
    <div>Customer/Pool</div>
  );
}

Pool.propTypes = {
};

export default connect()(Pool);
