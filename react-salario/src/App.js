import React, { Component } from 'react';
import { calculateSalaryFrom } from './salary';
import Bar from './components/Bar/Bar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      baseINSS: 0,
      discountINSS: 0,
      baseIRPF: 0,
      discountIRPF: 0,
      netSalary: 0,

      bar1: 0,
      bar2: 0,
      bar3: 0,
    };
  }

  handleInput = (event) => {
    const valueSalary = event.target.value;
    const dataSalary = calculateSalaryFrom(valueSalary);

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = dataSalary;

    this.setState({
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    });

    // const { netSalary, discountINSS, discountIRPF } = this.state;
    const bar1 = netSalary;
    const bar2 = discountINSS;
    const bar3 = discountIRPF;

    this.setState({ bar1, bar2, bar3 });
  };

  // handleChangeBar1 = (event) => {

  // };

  render() {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      bar1,
      bar2,
      bar3,
    } = this.state;

    return (
      <div>
        <h1>React Salário</h1>
        <input type='number' onChange={this.handleInput} />
        <div>
          <label>Base INSS</label>
          <input type='text' disabled value={baseINSS} />

          <label>Desconto INSS</label>
          <input
            type='text'
            disabled
            value={`${discountINSS} (${(
              (discountINSS * 100) /
              baseINSS
            ).toFixed(2)}%)`}
          />

          <label>Base IRPF</label>
          <input type='text' disabled value={baseIRPF} />

          <label>Desconto IRPF</label>
          <input
            type='text'
            disabled
            value={`${discountIRPF} (${(
              (discountIRPF * 100) /
              baseINSS
            ).toFixed(2)}%)`}
          />

          <label>Salario Liquido</label>
          <input
            type='text'
            disabled
            value={`${netSalary} (${((netSalary * 100) / baseINSS).toFixed(
              2
            )}%)`}
          />
        </div>
        <div>
          <div className='App'>
            <h1>React barras</h1>
            <input
              type='number'
              placeholder='Barra 1'
              value={bar1}
              onChange={this.handleInput}
              min='0'
              max='100'
              step='1'
            />
            &nbsp;
            <input
              type='number'
              placeholder='Barra 1'
              value={bar2}
              onChange={this.handleInput}
              min='0'
              max='100'
              step='1'
            />
            &nbsp;
            <input
              type='number'
              placeholder='Barra 1'
              value={bar3}
              onChange={this.handleInput}
              min='0'
              max='100'
              step='1'
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Bar value={bar1} color='red' />
            <Bar value={bar2} color='green' />
            <Bar value={bar3} color='blue' />
          </div>
        </div>
      </div>
    );
  }
}
