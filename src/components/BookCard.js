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
import { increaseAction } from "../redux/actions/orderAction";
import "../styles/BookCard.css";
import axios from "axios";
import { addToShoppingCartUrl, deleteBookUrl } from "../all_api/constants";

export class BookCard extends Component {
  state = {
    openModal: "false",
  };

  handleDeleteBook = async () => {
    try {
      await axios.delete(`${deleteBookUrl}/${this.props.book.bookId}`);
      this.props.remove(this.props.book.bookId);
    } catch {
      console.log("Remove failed");
    }
  };

  handleAddToShoppingCart = () => {
    axios
      .get(`${addToShoppingCartUrl}/${this.props.book.bookId}`)
      .then((response) => {
        console.log(response.data);
        response.data && this.props.increaseAction(1);
      });
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
              {book.bookName ? (
                book.bookName.length <= 30 ? (
                  book.bookName
                ) : (
                  <Popup
                    trigger={
                      <div>{book.bookName.substring(0, 27) + " ..."}</div>
                    }
                    position="bottom right"
                  >
                    <Popup.Content>{book.bookName}</Popup.Content>
                  </Popup>
                )
              ) : (
                ""
              )}
            </Card.Header>

            <Card.Meta>
              <span className="date">
                <List>
                  {book.authorsList
                    ? book.authorsList.map((author) =>
                        author.length <= 21 ? (
                          <List.Item> {author}</List.Item>
                        ) : (
                          <Popup
                            trigger={
                              <List.Item>
                                {author.substring(0, 17) + " ..."}
                              </List.Item>
                            }
                            position="bottom right"
                          >
                            <Popup.Content>{author}</Popup.Content>
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
          {cardType === "user" && (
            <Button onClick={this.handleAddToShoppingCart}>Sepete Ekle</Button>
          )}

          <Button onClick={this.handleDeleteBook}>Kitabı Sil</Button>
        </Card>
      </div>
    );
  }
}

export default connect(null, { setAction, modalAction, increaseAction })(
  BookCard
);
