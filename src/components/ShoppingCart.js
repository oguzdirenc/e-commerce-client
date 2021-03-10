import axios from "axios";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
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

  render() {
    return (
      <div>
        <Button onClick={() => console.log(this.state)}>console</Button>
        {this.state.books.map((book) => (
          <ShoppingCartCard book={book} />
        ))}
      </div>
    );
  }
}
