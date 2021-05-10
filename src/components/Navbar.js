import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Input,
  Menu,
  Dropdown,
  Button,
  Label,
  Icon,
  Grid,
  Form,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/securityActions";
import { orderAction } from "../redux/actions/orderAction";
import {
  getAllBooksUrl,
  searhBookUrl,
  shoppingCartBooksUrl,
} from "../all_api/constants";
import "../styles/Navbar.css";
import axios from "axios";

class Navbar extends Component {
  state = {
    activeItem: "home",
    books: [],
    search: "",
  };

  handleLogout = () => {
    this.props.logout();
    window.location.href = "/";
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSearch = () => {
    console.log("submit");
    axios
      .get(`${searhBookUrl}/${this.state.search}`)
      .then((response) => this.props.bookAction(response.data));
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid className="main" secondary>
        <NavLink to="/allBooks">
          <Menu.Item>
            <Button
              inverted
              className="home"
              name="Ana Sayfa"
              active={activeItem === "home"}
              onClick={this.handleHomeClick}
            >
              Ana Sayfa
            </Button>
          </Menu.Item>
        </NavLink>
        <Menu.Item>
          <Form onSubmit={this.handleSearch}>
            <Input
              className="navbar-search"
              icon="search"
              placeholder="Kitap Ara..."
              onChange={(event) =>
                this.setState({ search: event.target.value })
              }
            />
          </Form>
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
            <Icon size="large" inverted name="shopping cart"></Icon>
          </Menu.Item>

          <Menu.Item>
            <Dropdown
              icon={{
                className: "inverted",
                size: "large",
                name: "user",
              }}
            >
              <Dropdown.Menu>
                <Dropdown.Item>Profilim</Dropdown.Item>
                <Dropdown.Item as={Link} to="/admin">
                  Admin
                </Dropdown.Item>
                <Dropdown.Item>Favorilerim</Dropdown.Item>
                <Dropdown.Item>Siparişlerim</Dropdown.Item>
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
