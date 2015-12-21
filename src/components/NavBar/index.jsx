import React from 'react';
import styles from './index.scss';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className={styles.component}>
        <Link to="/">
          Gift Thing
        </Link>

        <div>
          Log in
        </div>
      </div>
    );
  }
}
