import axios from "axios";
import React, { Component } from "react";
import { Button, Item, Label, Icon, Grid } from "semantic-ui-react";
import "../styles/ShoppingCartCard.css";
import { orderAction } from "../redux/actions/orderAction";
import {
  addToShoppingCartUrl,
  deleteBookOrderUrl,
  shoppingCartBooksUrl,
  decreaseBookOrderUrl,
} from "../all_api/constants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ShoppingCartCard extends Component {
  state = {
    count: 1,
  };

  componentDidMount() {
    this.setState({
      count: this.props.book.count,
    });
  }

  async handleRemoveFromCard(order) {
    try {
      if (order > 1) {
        await axios
          .get(`${decreaseBookOrderUrl}/${this.props.book.book.bookId}`)
          .then(
            axios
              .get(shoppingCartBooksUrl)
              .then((response) => this.props.orderAction(response.data))
          );
        this.setState({
          count: this.state.count - 1,
        });
        this.props.update();
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleAddToShoppingCart = async () => {
    try {
      await axios
        .post(`${addToShoppingCartUrl}/${this.props.book.book.bookId}`)
        .then(
          axios
            .get(shoppingCartBooksUrl)
            .then((response) => this.props.orderAction(response.data))
        );
      this.setState({
        count: this.state.count + 1,
      });
      this.props.update();
    } catch (error) {
      console.log(error);
    }
  };

  state = {
    order: this.props.book.orderSize,
  };
  render() {
    const { book } = this.props.book;
    const count = this.props.book.count;

    return (
      <Item.Group>
        <Item className="shopping-card">
          <Item.Image size="tiny" src={book.bookThumbnail} />

          <Item.Content className="card-content">
            <Item.Header>{book.bookName}</Item.Header>
            <Item.Meta>
              <span className="cinema">
                {book.bookAuthorsList
                  ? book.bookAuthorsList.map((author) => author.authorName)
                  : ""}
              </span>
            </Item.Meta>
            <Item.Extra>
              {book.categoryBooksList
                ? book.categoryBooksList.map((category) => (
                    <Label>{category.categoryDescription}</Label>
                  ))
                : ""}
            </Item.Extra>
          </Item.Content>

          <Item.Content className="card-button">
            <Item.Header>38.8 TL</Item.Header>
            <Item.Extra>
              <Button.Group>
                <Button
                  className="card-button"
                  color="orange"
                  icon="minus"
                  onClick={() => this.handleRemoveFromCard(count)}
                ></Button>
                <h3 className="card-label">{this.state.count}</h3>
                <div className="card-button-group">
                  <Button
                    className="card-button"
                    color="orange"
                    icon="plus"
                    onClick={this.handleAddToShoppingCart}
                  />
                </div>
              </Button.Group>
            </Item.Extra>

            <Link className="delete-icon">sil</Link>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default connect(null, { orderAction })(ShoppingCartCard);
