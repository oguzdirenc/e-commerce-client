import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Icon,
  Image,
  List,
  Popup,
  Rating,
} from "semantic-ui-react";
import { setAction } from "../redux/actions/setAction";
import { modalAction } from "../redux/actions/modalAction";
import "../styles/BookCard.css";

export class BookCard extends Component {
  state = {
    openModal: "false",
  };

  render() {
    const { book, cardType } = this.props;

    return (
      <div>
        <Card className="card">
          <Card.Content fluid="true">
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
              {book.bookName.length <= 30 ? (
                book.bookName
              ) : (
                <Popup
                  trigger={<div>{book.bookName.substring(0, 27) + " ..."}</div>}
                  position="bottom right"
                >
                  <Popup.Content>{book.bookName}</Popup.Content>
                </Popup>
              )}
            </Card.Header>

            <Card.Meta>
              <span className="date">
                <List>
                  {book.authorsList
                    ? book.authorsList.map((author) =>
                        author.authorName.length <= 21 ? (
                          <List.Item> {author.authorName}</List.Item>
                        ) : (
                          <Popup
                            trigger={
                              <List.Item>
                                {author.authorName.substring(0, 17) + " ..."}
                              </List.Item>
                            }
                            position="bottom right"
                          >
                            <Popup.Content>{author.authorName}</Popup.Content>
                          </Popup>
                        )
                      )
                    : ""}
                </List>
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
          {cardType === "admin" && (
            <Button
              onClick={() => {
                this.props.setAction(book);
                this.props.modalAction(true);
              }}
            >
              Stok Oluştur
            </Button>
          )}
          {cardType === "user" && <Button>Sepete Ekle</Button>}
        </Card>
      </div>
    );
  }
}

export default connect(null, { setAction, modalAction })(BookCard);
