import React, { Component } from 'react';
import IncrementButton from './IncrementButton';
import Value from './Value';
import DecrementButton from './DecrementButton';
import css from './counter.module.css';

export default class counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 0,
    };
  }

  handleButtonClick = (clickType) => {
    const { currentCounter } = this.state;

    this.setState({
      currentCounter:
        clickType === '+'
          ? currentCounter + 1
          : clickType === '-' && currentCounter === 0
          ? currentCounter
          : currentCounter - 1,
    });
  };

  render() {
    const { currentCounter } = this.state;

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={currentCounter} />
        <IncrementButton onIncrement={this.handleButtonClick} />
      </div>
    );
  }
}
