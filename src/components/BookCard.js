import React, { Component } from "react";
import { Button, Card, Icon, Image, Rating } from "semantic-ui-react";
import "../styles/BookCard.css";

export class BookCard extends Component {
  render() {
    const { book, cardType } = this.props;

    return (
      <div>
        <Card className="card">
          <Card.Content fluid>
            <Card.Content>
              <Image
                className="card-image"
                src={
                  book.bookThumbnail
                    ? book.bookThumbnail
                    : "https://kitapbulur.com/images/default/book.jpg"
                }
              />
            </Card.Content>

            <Card.Header className="card-header" textAlign="center">
              {book.bookName}
            </Card.Header>
            <Card.Meta>
              <span className="date">
                {book.authorsList
                  ? book.authorsList.map((author) => author.authorName)
                  : ""}
              </span>
            </Card.Meta>
            {cardType === "user" && (
              <Rating
                icon="star"
                defaultRating={book.bookRate}
                maxRating={5}
                disabled
              />
            )}
            {cardType === "user" && (
              <Card.Meta>
                {book.bookPrice} <Icon name="try" />
              </Card.Meta>
            )}
          </Card.Content>
          <Card.Content extra>
            {cardType === "user" && (
              <a>
                <Icon name="user" />
                22 Friends
              </a>
            )}
          </Card.Content>
          {cardType === "admin" && <Button>Stok Oluştur</Button>}
          {cardType === "user" && <Button>Sepete Ekle</Button>}
        </Card>
      </div>
    );
  }
}

export default BookCard;
