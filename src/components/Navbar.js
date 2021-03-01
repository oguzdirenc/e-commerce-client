import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Input, Menu, Dropdown, Button } from "semantic-ui-react";
import "../styles/Navbar.css";

export class Navbar extends Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <NavLink to="/allBooks">
          <Menu.Item
            className="home"
            name="Ana Sayfa"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
        </NavLink>
        <Menu.Item>
          <Input icon="search" placeholder="Ara..." />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="sepetim"
            active={activeItem === "Cart"}
            onClick={this.handleItemClick}
          />
          <Button onClick={() => console.log(this.props)}>Test Button</Button>

          <Menu.Item>
            <Dropdown icon="user">
              <Dropdown.Menu>
                <Dropdown.Item>Profilim</Dropdown.Item>
                <Dropdown.Item as={Link} to="/admin">
                  Admin
                </Dropdown.Item>
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

/*const mapStateToProps = (state) => {
  const { test } = state;

  return { test: test };
}*/ export default Navbar;
