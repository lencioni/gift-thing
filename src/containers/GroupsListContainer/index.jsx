import GroupsList from 'components/GroupsList';
import React, { PropTypes } from 'react';
import fetch from 'utils/fetch';
import { actions as groupsActions } from 'redux/modules/groups';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  groups: state.groups,
});

class GroupsListContainer extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    groups: PropTypes.array,
    receiveGroups: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {
      currentUser,
      receiveGroups,
    } = this.props;

    fetch(`/api/users/${currentUser.id}/groups`)
      .then(res => res.json())
      .then(json => receiveGroups(json));
  }

  render() {
    const {
      groups,
    } = this.props;

    return (
      <div>
        {!groups && 'Loading...'}
        {groups && <GroupsList groups={groups} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, groupsActions)(GroupsListContainer);
