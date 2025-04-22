import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "all"
    };
  }

  // Update search text
  onSearch = (event) => {
    this.setState({
      search: event.target.value.trim().toLowerCase()
    });
  }

  // Handle dropdown selection
  onFilter = (eventKey) => {
    this.setState({ type: eventKey });
  }

  // Filter logic — search + type
  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType = this.state.type === "all" || 
                        item.type.toLowerCase() === this.state.type.toLowerCase();
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>

        <DropdownButton id="typeDropdown" title="Type" onSelect={this.onFilter}>
          <MenuItem eventKey="all">All</MenuItem>
          <MenuItem eventKey="fruit">Fruits</MenuItem>
          <MenuItem eventKey="vegetable">Vegetables</MenuItem>
        </DropdownButton>

        <input
          type="text"
          placeholder="Search"
          onChange={this.onSearch}
        />

        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
