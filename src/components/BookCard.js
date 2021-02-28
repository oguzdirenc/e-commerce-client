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
  Modal,
  Label,
  Form,
} from "semantic-ui-react";
import "../styles/BookCard.css";
import BookSaveStep from "./BookSaveStep";
import { testAction } from "../redux/actions/testAction";

export class BookCard extends Component {
  state = {
    openAdminModal: false,
    steps: { stepOne: true, stepTwo: false, stepTree: false },
    book: {},
    bookCategory: "",
    bookCategoryList: [],
  };

  renderAuthorName = (author) => {};

  renderAdminModal = () => {
    return (
      <Modal
        onClose={() =>
          this.setState({
            openAdminModal: false,
          })
        }
        className="modal-height"
        open={this.state.openAdminModal}
      >
        <BookSaveStep steps={this.state.steps} />

        {this.state.steps.stepOne && (
          <div>
            <Modal.Content image>
              <Image
                className="card-image"
                src={this.props.book.bookThumbnail}
                wrapped
              />

              <Form>
                <Form.Input
                  value={this.state.book.bookName}
                  onChange={(event) =>
                    this.setState({
                      book: {
                        ...this.state.book,
                        bookName: event.target.value,
                      },
                    })
                  }
                  label="Kitap Adı"
                  placeholder="Kİtap adını giriniz..."
                />

                <Form.Input
                  value={this.state.book.publisherName}
                  onChange={(event) =>
                    this.setState({
                      book: {
                        ...this.state.book,
                        publisherName: event.target.value,
                      },
                    })
                  }
                  label="Yayınevi"
                  placeholder="Yayınevi giriniz..."
                />
                <Form.Input
                  value={this.state.book.publishedDate}
                  onChange={(event) =>
                    this.setState({
                      book: {
                        ...this.state.book,
                        publishedDate: event.target.value,
                      },
                    })
                  }
                  label="Yayınlanma tarihi"
                  placeholder="Yayınlanma tarihi giriniz..."
                />

                <Form.Input
                  value={this.state.book.bookPage}
                  onChange={(event) =>
                    this.setState({
                      book: {
                        ...this.state.book,
                        bookPage: event.target.value,
                      },
                    })
                  }
                  label="Sayfa Sayısı"
                  placeholder="Sayfa sayısını giriniz..."
                />

                <Form.Input
                  value={this.state.bookCategory}
                  onChange={(event) =>
                    this.setState({
                      bookCategory: event.target.value,
                    })
                  }
                  label="Kategori"
                  placeholder="Kategori giriniz..."
                />
                <Button
                  onClick={() => {
                    this.setState({
                      bookCategoryList: [
                        ...this.state.bookCategoryList,
                        { categoryDescription: this.state.bookCategory },
                      ],
                      bookCategory: "",
                    });
                  }}
                >
                  +
                </Button>
                {this.state.bookCategoryList.map((category) => (
                  <Label as="a">
                    {category.categoryDescription}
                    <Icon
                      onClick={() => {
                        let filteredCategory = this.state.bookCategoryList.filter(
                          (categoryName) =>
                            categoryName.categoryDescription !==
                            category.categoryDescription
                        );
                        this.setState({ bookCategoryList: filteredCategory });
                      }}
                      name="delete"
                    />
                  </Label>
                ))}

                <Form.TextArea
                  value={this.state.book.description}
                  onChange={(event) =>
                    this.setState({
                      book: {
                        ...this.state.book,
                        description: event.target.value,
                      },
                    })
                  }
                  label="Açıklama"
                  placeholder="Açıklama giriniz..."
                />
              </Form>
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
                  steps: {
                    stepOne: false,
                    stepTwo: false,
                    stepTree: false,
                  },
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
                  book: this.props.book,
                  openAdminModal: true,
                  steps: {
                    stepOne: true,
                    stepTwo: false,
                    stepTree: false,
                  },
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

export default connect(null, { testAction })(BookCard);
