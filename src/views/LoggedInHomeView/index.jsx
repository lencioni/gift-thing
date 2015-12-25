import GroupsListContainer from 'containers/GroupsListContainer';
import React from 'react';

export default class LoggedInHomeView extends React.Component {
  render() {
    return (
      <div>
        <GroupsListContainer />
      </div>
    );
  }
}
