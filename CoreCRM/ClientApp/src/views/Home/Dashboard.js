import React from 'react';
import { connect } from 'dva';
// import styles from './Index.css';

function Dashboard() {
  return (
    <div>Home/Index</div>
  );
}

Dashboard.propTypes = {
};

export default connect()(Dashboard);
