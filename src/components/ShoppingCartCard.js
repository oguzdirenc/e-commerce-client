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
  removeBookFromOrderUrl,
} from "../all_api/constants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ShoppingCartCard extends Component {
  state = {
    order: 0,
  };

  componentDidMount() {
    this.setState({
      order: this.props.book.count,
    });
  }

  handleDecreaseOrderFromCard = async () => {
    try {
      if (this.state.order > 1) {
        await axios
          .get(`${decreaseBookOrderUrl}/${this.props.book.book.bookId}`)
          .then(() => this.setState({ order: this.state.order - 1 }));

        await axios
          .get(shoppingCartBooksUrl)
          .then((response) => this.props.orderAction(response.data));

        this.props.update();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleAddToShoppingCart = async () => {
    try {
      await axios
        .post(`${addToShoppingCartUrl}/${this.props.book.book.bookId}`)
        .then(() => this.setState({ order: this.state.order + 1 }));

      await axios
        .get(shoppingCartBooksUrl)
        .then((response) => this.props.orderAction(response.data));

      this.props.update();
    } catch (error) {
      console.log(error);
    }
  };

  handleRemoveBook = async () => {
    try {
      await axios.post(
        `${removeBookFromOrderUrl}/${this.props.book.book.bookId}`
      );
      this.props.remove(this.props.book.book.bookId);
      this.props.update();
    } catch (error) {
      console.log(error);
    }
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

          <Item.Content className="card-button flexbox-container">
            <Grid>
              <Grid.Column>
                <Grid.Row>
                  <h3 className="book-price">{book.bookPrice} TL</h3>
                </Grid.Row>
                <Grid.Row>
                  <Button.Group>
                    <Button
                      className="card-button"
                      color="orange"
                      icon="minus"
                      onClick={this.handleDecreaseOrderFromCard}
                    ></Button>
                    <h3 className="card-label">{this.state.order}</h3>
                    <div className="card-button-group">
                      <Button
                        className="card-button"
                        color="orange"
                        icon="plus"
                        onClick={this.handleAddToShoppingCart}
                      />
                    </div>
                  </Button.Group>
                </Grid.Row>
                <Grid.Row>
                  <Button
                    className="delete-button"
                    color="red"
                    size="mini"
                    onClick={this.handleRemoveBook}
                  >
                    Çıkar
                  </Button>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default connect(null, { orderAction })(ShoppingCartCard);
