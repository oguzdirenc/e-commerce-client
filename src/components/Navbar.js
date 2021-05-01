import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Input, Menu, Dropdown, Button, Label, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/securityActions";
import { orderAction } from "../redux/actions/orderAction";
import { shoppingCartBooksUrl } from "../all_api/constants";
import "../styles/Navbar.css";
import axios from "axios";

class Navbar extends Component {
  state = {
    activeItem: "home",
    books: [],
  };

  handleLogout = () => {
    this.props.logout();
    window.location.href = "/";
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
            onClick={this.handleOrderClick}
          >
            <Icon size="large" name="shopping cart"></Icon>
            <Label className="label" color="orange" floating fluid>
              {this.state.books.length}
            </Label>
          </Menu.Item>

          <Menu.Item>
            <Dropdown icon={{ size: "large", name: "user" }}>
              <Dropdown.Menu>
                <Dropdown.Item>Profilim</Dropdown.Item>
                <Dropdown.Item as={Link} to="/admin">
                  Admin
                </Dropdown.Item>
                <Dropdown.Item>Favorilerim</Dropdown.Item>
                <Dropdown.Item onClick={() => console.log(this.orderBooks)}>
                  Siparişlerim
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleLogout}>
                  Çıkış Yap
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  const { security, order } = state;

  return { security: security, order: order };
};
export default connect(mapStateToProps, {
  logout,
  orderAction,
})(Navbar);
