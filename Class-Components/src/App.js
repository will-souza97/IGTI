import React, { Component } from 'react';
import Band from './components/Band';
import Counter from './components/counter/counter';

export default class App extends Component {
  render() {
    return (
      <div>
        <Band />
        <Counter /> <Counter /> <Counter />
      </div>
    );
  }
}
