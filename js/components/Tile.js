import React, { Component } from 'react';
import { range } from '../utils/util';

function isNumber(num) {
  const numbers = range(1, 10).map(num => num.toString());
  return numbers.includes(num);
}

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      value: this.props.tile.value
    };
  }

  className() {
    let classList = ["tile"];
    if (this.props.selectedId === this.props.tile.id) classList.push("selected");
    if (!this.props.tile.editable) classList.push("given");
    return classList.join(" ");
  }

  handleChange(e) {
    const value = e.currentTarget.value;
    let num = value[value.length - 1];

    if (!isNumber(num)) { num = ""; }
    this.setState({ value: num });
  }

  handleBlur(e) {
    this.setValue();
    this.props.select(null);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setValue();
    this.props.select(null);
    this.input.blur();
  }

  setValue() {
    this.props.tile.value = parseInt(this.state.value);
  }

  render() {
    return (
      <li onClick={() => this.props.select(this.props.tile.id)} className={ this.className() }>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.state.value}
            ref={(node) => this.input = node }
            />
        </form>
      </li>
    );
  }
}
