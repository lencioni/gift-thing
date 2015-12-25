import React from 'react';
import styles from './index.scss';
import { Link } from 'react-router';
import { actions as currentUserActions } from 'redux/modules/currentUser';
import { connect } from 'react-redux';

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
