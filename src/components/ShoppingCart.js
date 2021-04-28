import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Item } from "semantic-ui-react";
import { shoppingCartBooksUrl } from "../all_api/constants";
import ShoppingCartCard from "./ShoppingCartCard";

export class ShoppingCart extends Component {
  state = {
    shoppingCart: [],
  };

  componentDidMount() {
    axios
      .get(`${shoppingCartBooksUrl}/${this.props.security.user.username}`)
      .then((response) => {
        console.log(response);
        this.setState({
          shoppingCart: response.data,
        });
      });
  }

  handleRemove = (bookId) => {
    let filteredBooks = this.state.shoppingCart.filter(
      (book) => book.bookId !== bookId
    );
    this.setState({
      shoppingCart: {
        ...this.state.shoppingCart,
        shoppingCartBooks: filteredBooks,
      },
    });
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
              {this.state.shoppingCart
                ? this.state.shoppingCart.map((book) => (
                    <Grid.Row>
                      <ShoppingCartCard
                        book={book}
                        remove={this.handleRemove}
                      />
                    </Grid.Row>
                  ))
                : ""}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { security } = state;
  return {
    security: security,
  };
};

export default connect(mapStateToProps, null)(ShoppingCart);
