import axios from "axios";
import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import "../styles/ShoppingCartCard.css";
import { setBookOrderUrl } from "../all_api/constants";

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

  state = {
    order: this.props.book.orderSize,
  };
  render() {
    const { book } = this.props;

    return (
      <Card className="main-card">
        <Image src={book.bookThumbnail}></Image>

        <Card.Header>{book.bookName}</Card.Header>
        <Card.Meta>
          {book.bookAuthorsList
            ? book.bookAuthorsList.map((author) => author.authorName)
            : ""}
        </Card.Meta>

        <Button.Group>
          <Button icon="plus" onClick={() => this.handleOrderButton(1)} />
          <h3>{this.state.order}</h3>
          <Button icon="minus" onClick={() => this.handleOrderButton(-1)} />
        </Button.Group>
      </Card>
    );
  }
}

export default ShoppingCartCard;
