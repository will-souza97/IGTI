// https://randomuser.me/api/?seed=rush&nat=br&results=10
// {JSON.stringify(this.state.users)}

import React, { Component } from 'react';
import Users from './components/users/Users';
import Toogle from './components/toggle/Toggle';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: false,
    };
  }
  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );
    const json = await res.json();

    this.setState({
      users: json.results,
    });
  }

  handleShowUsers = (isChecked) => {
    this.setState({
      showUsers: isChecked,
    });
  };

  render() {
    const { showUsers, users } = this.state;

    return (
      <div>
        <h3>React LiveCycle</h3>
        <Toogle enabled={showUsers} onToggle={this.handleShowUsers} />
        <hr />
        {showUsers && <Users users={users} />}
      </div>
    );
  }
}
