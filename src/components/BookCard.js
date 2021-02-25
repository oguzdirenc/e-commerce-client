import React, { Component } from "react";
import { Card, Icon, Image, Rating } from "semantic-ui-react";

export class BookCard extends Component {
  render() {
    const { book } = this.props;
    return (
      <div>
        <Card>
          <Image src={book.bookThumbnail} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{book.bookName}</Card.Header>
            <Card.Meta>
              <span className="date">
                {book.authorsList
                  ? book.authorsList.map((author) => author.authorName)
                  : ""}
              </span>
            </Card.Meta>
            <Rating
              icon="star"
              defaultRating={book.bookRate}
              maxRating={5}
              disabled
            />
            <Card.Meta>
              {book.bookPrice} <Icon name="try" />
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default BookCard;
