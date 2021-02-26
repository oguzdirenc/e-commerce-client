import React, { Component } from "react";
import {
  Button,
  Card,
  Icon,
  Image,
  List,
  Popup,
  Rating,
  Modal,
  Header,
} from "semantic-ui-react";
import "../styles/BookCard.css";
import BookSaveStep from "./BookSaveStep";

export class BookCard extends Component {
  state = {
    openAdminModal: false,
    steps: { stepOne: true, stepTwo: false, stepTree: false },
  };

  renderAdminModal = () => {
    return (
      <Modal open={this.state.openAdminModal}>
        <BookSaveStep steps={this.state.steps} />

        {this.state.steps.stepOne && (
          <div>
            <Modal.Content image>
              <Image size="huge" src={this.props.book.bookThumbnail} wrapped />

              <Modal.Header>{this.props.book.bookName}</Modal.Header>
            </Modal.Content>
            <Button
              onClick={() => {
                this.setState({
                  steps: {
                    stepOne: false,
                    stepTwo: true,
                    stepTree: false,
                  },
                });
              }}
            >
              stepTwo
            </Button>
          </div>
        )}

        {this.state.steps.stepTwo && (
          <div>
            <Modal.Content>
              <Modal.Header>
                {this.props.book.authorsList.map((author) => author.authorName)}
              </Modal.Header>
            </Modal.Content>
            <Button
              onClick={() => {
                this.setState({
                  steps: {
                    stepOne: false,
                    stepTwo: false,
                    stepTree: true,
                  },
                });
              }}
            >
              stepTree
            </Button>
          </div>
        )}

        {this.state.steps.stepTree && (
          <div>
            <Button
              onClick={() => {
                this.setState({
                  openAdminModal: false,
                });
              }}
            >
              close tab
            </Button>
          </div>
        )}
      </Modal>
    );
  };

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
                this.setState({
                  openAdminModal: true,
                });
              }}
            >
              Stok Oluştur
            </Button>
          )}
          {cardType === "user" && <Button>Sepete Ekle</Button>}
        </Card>
        {this.renderAdminModal(book)}
      </div>
    );
  }
}

export default BookCard;
