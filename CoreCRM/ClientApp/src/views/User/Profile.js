import React from 'react';
import { connect } from 'dva';
// import styles from './Profile.css';

function Profile() {
  return (
    <div>个人资料</div>
  );
}

Profile.propTypes = {
};

export default connect()(Profile);
