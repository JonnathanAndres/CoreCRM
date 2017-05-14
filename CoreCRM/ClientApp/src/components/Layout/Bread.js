import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Bread.less';

const Bread = ({ breads }) => {
  const items = breads.map((bread, index) => {
    return (
      <Breadcrumb.Item key={`bread-${index}`}>
        {bread.route ?
          <Link to={bread.route}>{bread.icon && <Icon type={bread.icon} />} {bread.name}</Link> :
          <span>{bread.icon && <Icon type={bread.icon} />} {bread.name}</span>}
      </Breadcrumb.Item>);
  });

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {items}
      </Breadcrumb>
    </div>
  );
};

Bread.propTypes = {
  breads: PropTypes.array,
};

export default Bread;
