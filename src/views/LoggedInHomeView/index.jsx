import React from 'react';

import GroupsListContainer from '../../containers/GroupsListContainer';

export default class LoggedInHomeView extends React.Component {
  render() {
    return (
      <div>
        <GroupsListContainer />
      </div>
    );
  }
}
