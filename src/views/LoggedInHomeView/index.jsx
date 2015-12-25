import GroupsList from 'components/GroupsList';
import React from 'react';

export default class LoggedInHomeView extends React.Component {
  render() {
    return (
      <div>
        <GroupsList />
      </div>
    );
  }
}
