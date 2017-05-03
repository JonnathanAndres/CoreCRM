import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Employee() {
  return (
    <div>Company/Employee</div>
  );
}

Employee.propTypes = {
};

export default connect()(Employee);
