import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Input, Menu, Dropdown, Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import "../styles/Navbar.css";

class Navbar extends Component {
  state = {
    activeItem: "home",
    orderCount: 0,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid className="main" secondary>
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
            as={Link}
            to="/shoppingCart"
            fitted="vertically"
            name="sepetim"
            className="order"
            active={activeItem === "Cart"}
            onClick={this.handleItemClick}
          >
            Sepetim
            <Label className="label" color="red" floating fluid>
              {this.props.orderCount}
            </Label>
          </Menu.Item>

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

const mapStateToProps = (state) => {
  const { orderCount } = state;

  return { orderCount: orderCount };
};
export default connect(mapStateToProps, null)(Navbar);
