import React, { Component } from 'react';

export default class Inputs extends Component {
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>React Salário</h1>
        <input type='number' />
        <div>
          <label>Base INSS</label>
          <input type='text' disabled />

          <label>Desconto INSS</label>
          <input type='text' disabled />

          <label>Base IRPF</label>
          <input type='text' disabled />

          <label>Desconto IRPF</label>
          <input type='text' disabled />

          <label>Salario Liquido</label>
          <input type='text' disabled />
        </div>
      </div>
    );
  }
}
