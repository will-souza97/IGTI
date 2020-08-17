import React, { Component } from 'react';

export default class Band extends Component {
  constructor() {
    super();
    this.state = {
      bandName: 'Cabra da Peste!!',
      bandMembers: [
        {
          id: 1,
          name: 'Chacrinha',
          instrument: 'Cavaquinho',
        },
        {
          id: 2,
          name: 'Michal Jackson',
          instrument: 'Chucalho',
        },
        {
          id: 3,
          name: 'Tiringa',
          instrument: 'Canivete',
        },
      ],
    };
  }
  render() {
    const { bandName, bandMembers } = this.state;
    return (
      <div>
        <h3>{bandName}</h3>
        <ul>
          {bandMembers.map(({ id, name, instrument }) => {
            return (
              <li key={id}>
                {name} - {instrument}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
