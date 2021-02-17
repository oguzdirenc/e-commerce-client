import React, { Component } from "react";
import { Input, Menu, Dropdown } from "semantic-ui-react";

export class Navbar extends Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item
          name="Ana Sayfa"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item>
          <Input icon="search" placeholder="Ara..." />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="sepetim"
            active={activeItem === "Cart"}
            onClick={this.handleItemClick}
          />
          <Menu.Item>
            <Dropdown icon="user">
              <Dropdown.Menu>
                <Dropdown.Item>Profilim</Dropdown.Item>
                <Dropdown.Item>Favorilerim</Dropdown.Item>
                <Dropdown.Item>Siparişlerim</Dropdown.Item>
                <Dropdown.Item>Çıkış Yap</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
