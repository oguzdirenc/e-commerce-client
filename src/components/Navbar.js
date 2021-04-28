import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Input, Menu, Dropdown, Button, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/securityActions";
import { setOrderBooks } from "../redux/actions/orderAction";
import { setOrderCounts } from "../redux/actions/orderCountAction";
import { shoppingCartBooksUrl } from "../all_api/constants";
import "../styles/Navbar.css";
import axios from "axios";
import store from "../redux/store";

class Navbar extends Component {
  state = {
    activeItem: "home",
    orderCount: 1,
    shoppingCart: [],
    orderBookCounts: {
      book: {},
      count: 1,
    },
    allOrderBookCounts: [],
  };

  orderBooks = [];

  handleOrderClick = () => {
    var i;
    var j;
    axios
      .get(`${shoppingCartBooksUrl}/${this.props.security.user.username}`)
      .then((response) => {
        console.log(response);
        this.setState({
          shoppingCart: response.data,
          allOrderBookCounts: [],
        });
      })
      .then(() => {
        this.orderBooks = this.state.shoppingCart;
      })
      .then(() => {
        for (i = 0; i < this.orderBooks.length - 1; i++) {
          this.setState({
            orderCount: 1,
          });
          for (j = i + 1; j < this.orderBooks.length; j++) {
            if (this.orderBooks[i].bookId === this.orderBooks[j].bookId) {
              this.orderBooks.splice(j, 1);
              this.setState({
                orderCount: this.state.orderCount + 1,
              });
            }
          }
          this.setState(
            {
              orderBookCounts: {
                book: this.orderBooks[i],
                count: this.state.orderCount,
              },
            },
            this.setState({
              allOrderBookCounts: [
                ...this.state.allOrderBookCounts,
                this.state.orderBookCounts,
              ],
            })
          );
        }
      });

    store.dispatch(setOrderBooks(this.orderBooks));
    this.props.setOrderCounts(this.state.allOrderBookCounts);
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
            Sepetim
            <Label className="label" color="red" floating fluid>
              1
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
  const { security } = state;

  return { security: security };
};
export default connect(mapStateToProps, {
  logout,
  setOrderBooks,
  setOrderCounts,
})(Navbar);
