import React, { Component } from 'react';
import Item from './Item';
import Filter from './Filter';

class Items extends Component {
  state = {
    searchTerm: ''
  };

  updateSearchTerm = searchTerm => {
    this.setState({ searchTerm });
  };

  render() {
    const { searchTerm } = this.state;
    const { title, items, onChange, onRemove } = this.props;
    return (
      <section className="Items">
        <h2>
          {title} ({items.length})
        </h2>
        <Filter searchTerm={searchTerm} onChange={this.updateSearchTerm} />
        {items
          .filter(item => item.value.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(item => (
            <Item key={item.id} onCheckOff={() => onChange(item)} onRemove={() => onRemove(item)} item={item} />
          ))}
      </section>
    );
  }
}

export default Items;
