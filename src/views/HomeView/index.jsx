import React from 'react';

import './index.scss';

export default class HomeView extends React.Component {
  render() {
    return (
      <div className="container text-center">
        <a href ="/auth/login/facebook">Log in</a>
      </div>
    );
  }
}
