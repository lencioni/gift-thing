import React from 'react';
import styles from './index.scss';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className={styles.component}>
        <div>
          Logo
        </div>
        <div>
          Log in
        </div>
      </div>
    );
  }
}
