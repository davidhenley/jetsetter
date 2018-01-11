import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true }
];

class Application extends Component {
  state = {
    items: defaultState
  };

  handleAdd = itemToAdd => {
    this.setState(state => ({ items: [itemToAdd, ...state.items] }));
  };

  handleRemove = itemToRemove => {
    this.setState(state => ({ items: state.items.filter(item => item.id !== itemToRemove.id) }));
  };

  handleChange = itemToChange => {
    this.setState(state => ({
      items: state.items.map(item => {
        if (item.id !== itemToChange.id) return item;
        return { ...item, packed: !item.packed };
      })
    }));
  };

  handleAllUnpacked = () => {
    this.setState(state => ({
      items: state.items.map(item => ({ ...item, packed: false }))
    }));
  };

  render() {
    const { items } = this.state;

    return (
      <div className="Application">
        <NewItem onSubmit={this.handleAdd} />
        <CountDown />
        <Items
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
          title="Unpacked Items"
          items={items.filter(item => !item.packed)}
        />
        <Items
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
          title="Packed Items"
          items={items.filter(item => item.packed)}
        />
        <button className="button full-width" onClick={this.handleAllUnpacked}>
          Mark All As Unpacked
        </button>
      </div>
    );
  }
}

export default Application;
