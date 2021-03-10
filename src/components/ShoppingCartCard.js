import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import "../styles/ShoppingCartCard.css";

class ShoppingCartCard extends Component {
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
          <Button
            icon="plus"
            onClick={() => this.setState({ order: this.state.order + 1 })}
          />
          <h3>{this.state.order}</h3>
          <Button
            icon="minus"
            onClick={() => this.setState({ order: this.state.order - 1 })}
          />
        </Button.Group>
      </Card>
    );
  }
}

export default ShoppingCartCard;
