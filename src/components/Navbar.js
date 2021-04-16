import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Input, Menu, Dropdown, Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/securityActions";
import "../styles/Navbar.css";
import { shoppingCartBooksUrl } from "../all_api/constants";
import axios from "axios";

class Navbar extends Component {
  state = {
    activeItem: "home",
    orderCount: 0,
    shoppingCart: [],
  };

  orderBooks = [];
  componentDidMount() {
    var i;
    var j;
    axios
      .get(`${shoppingCartBooksUrl}/${this.props.security.user.username}`)
      .then((response) => {
        this.setState({
          shoppingCart: response.data,
        });
      })
      .then(() => {
        this.orderBooks = this.state.shoppingCart;
      })
      .then(() => {
        for (i = 0; i < this.orderBooks.length; i++) {
          for (j = i + 1; j < this.orderBooks.length; j++) {
            if (this.orderBooks[i].bookId === this.orderBooks[j].bookId) {
              this.orderBooks.splice(j, 1);
            }
          }
        }
      });
  }

  handleLogout = () => {
    this.props.logout();
    window.location.href = "/login";
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
  const { orderCount, security } = state;

  return { orderCount: orderCount, security: security };
};
export default connect(mapStateToProps, { logout })(Navbar);
