import axios from "axios";
import React, { Component } from "react";
import { Button, Item, Label, Icon, Grid } from "semantic-ui-react";
import "../styles/ShoppingCartCard.css";
import { setBookOrderUrl, deleteBookOrderUrl } from "../all_api/constants";

class ShoppingCartCard extends Component {
  handleOrderButton = (order) => {
    this.setState({ order: this.state.order + order }, () =>
      axios
        .post(
          `${setBookOrderUrl}/${this.props.book.bookId}/${this.state.order}`
        )
        .then((response) => console.log(response.data))
    );
  };

  handleRemoveOrder = async () => {
    try {
      await axios.post(`${deleteBookOrderUrl}/${this.props.book.bookId}`);
      this.props.remove(this.props.book.bookId);
    } catch {
      console.log("Remove failed");
    }
  };

  state = {
    order: this.props.book.orderSize,
  };
  render() {
    const { book } = this.props;

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
            <Button.Group>
              <Button
                className="card-button"
                icon="minus"
                onClick={() => this.handleOrderButton(-1)}
              ></Button>
              <h3 className="card-label">{this.state.order}</h3>
              <div className="card-button-group">
                <Button
                  className="card-button"
                  icon="plus"
                  onClick={() => this.handleOrderButton(1)}
                />
              </div>
            </Button.Group>
          </Item.Content>

          <Item.Content className="card-delete">
            <Icon
              className="delete-icon"
              onClick={this.handleRemoveOrder}
              name="delete"
            ></Icon>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default ShoppingCartCard;
