import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Input, Menu, Dropdown, Button, Popup } from "semantic-ui-react";
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
      <Menu className="main" secondary>
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
        <span className="order-count">{this.props.orderCount}</span>

        <Menu.Menu position="right">
          <Menu.Item
            name="sepetim"
            className="order"
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

const mapStateToProps = (state) => {
  const { orderCount } = state;

  return { orderCount: orderCount };
};
export default connect(mapStateToProps, null)(Navbar);
