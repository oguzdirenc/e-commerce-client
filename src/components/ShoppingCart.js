import axios from "axios";
import React, { Component } from "react";
import { Button, Grid, Item } from "semantic-ui-react";
import { shoppingCartBooksUrl } from "../all_api/constants";
import ShoppingCartCard from "./ShoppingCartCard";

export default class ShoppingCart extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    axios.get(shoppingCartBooksUrl).then((response) => {
      console.log(response.data);
      this.setState({
        books: response.data,
      });
    });
  }

  handleRemove = (bookId) => {
    let filteredBooks = this.state.books.filter(
      (book) => book.bookId !== bookId
    );
    this.setState({ books: filteredBooks });
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
              {this.state.books.map((book) => (
                <Grid.Row>
                  <ShoppingCartCard book={book} remove={this.handleRemove} />
                </Grid.Row>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
