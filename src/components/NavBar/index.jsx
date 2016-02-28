import { Link } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';
import { actions as currentUserActions } from 'redux/modules/currentUser';

import styles from './index.scss';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default class NavBar extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object,
  }

  render() {
    const {
      currentUser,
    } = this.props;

    return (
      <div className={styles.component}>
        <Link to={currentUser ? '/home' : '/'}>
          Gift Thing
        </Link>

        <div>
          {currentUser &&
            <div>
              {currentUser.name}{' '}
              <a href="/auth/logout">Log out</a>
            </div>
          }
          {!currentUser &&
            <a href="/auth/login/facebook">Log in</a>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, currentUserActions)(NavBar);
