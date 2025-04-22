import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "all"
    };
  }

  onSearch = (event) => {
    this.setState({
      search: event.target.value.trim().toLowerCase()
    });
  }

  onFilter = (type) => {
    this.setState({ type });
  }

  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType =
      this.state.type === "all" ||
      item.type.toLowerCase() === this.state.type.toLowerCase();
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>

        <DropdownButton id="typeDropdown" title="Type">
          <Dropdown.Item onClick={() => this.onFilter("all")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => this.onFilter("fruit")}>Fruits</Dropdown.Item>
          <Dropdown.Item onClick={() => this.onFilter("vegetable")}>Vegetables</Dropdown.Item>
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
