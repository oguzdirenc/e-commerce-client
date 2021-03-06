import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Icon, Image, Modal, Label, Form } from "semantic-ui-react";
import BookSaveStep from "./BookSaveStep";
import { modalAction } from "../redux/actions/modalAction";
import {
  saveBookUrl,
  updateBookUrl,
  categoryToBookUrl,
  putAuthorToBookUrl,
} from "../all_api/constants";

class SaveBook extends Component {
  state = {
    steps: { stepOne: true, stepTwo: false, stepTree: false },
    categoryList: [],
    bookCategory: "",
    temporaryBook: {},
    book: {},
    authorsList: [],
    authorOne: {
      authorName: "",
      authorBio: "",
      authorThumbnail: "",
    },
    authorTwo: {
      authorName: "",
      authorBio: "",
      authorThumbnail: "",
    },
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      book: nextProps.book,
      authorsList: nextProps.book.authorsList,
      temporaryBook: {
        bookPdfDownloadLink: nextProps.book.bookPdfDownloadLink,
        bookBuyLink: nextProps.book.bookBuyLink,
      },
    });
  }

  handleModalOnClose = () => {
    this.props.modalAction(false);
    this.setState({
      steps: { stepOne: true, stepTwo: false, stepTree: false },
      book: {},
      categoryList: [],
      bookCategory: "",
    });
  };

  handleFirstButton = async () => {
    const {
      bookName,
      bookThumbnail,
      publishedDate,
      publisherName,
      bookPage,
      description,
    } = this.state.book;

    await axios
      .post(saveBookUrl, {
        bookName: bookName,
        bookThumbnail: bookThumbnail,
        publishedDate: publishedDate,
        publisherName: publisherName,
        bookPage: bookPage,
        description: description,
      })
      .then((response) => {
        this.setState({
          book: response.data,
        });
      });

    axios.post(
      `${categoryToBookUrl}/${this.state.book.bookId}`,
      this.state.categoryList
    );

    this.setState({
      steps: {
        stepOne: false,
        stepTwo: true,
        stepTree: false,
      },
      authorOne: {
        authorName: this.state.authorsList[0] ? this.state.authorsList[0] : "",
      },
      authorTwo: {
        authorName: this.state.authorsList[1] ? this.state.authorsList[1] : "",
      },
    });
  };

  handleSecondButton = () => {
    this.setState(
      {
        steps: {
          stepOne: false,
          stepTwo: false,
          stepTree: true,
        },
        authorsList: [this.state.authorOne, this.state.authorTwo],
        categoryList: [],
      },
      () => {
        axios
          .post(
            `${putAuthorToBookUrl}/${this.state.book.bookId}`,
            this.state.authorsList
          )
          .then((response) =>
            this.setState({
              book: {
                ...response.data,
                bookPdfDownloadLink: this.state.temporaryBook
                  .bookPdfDownloadLink,
                bookBuyLink: this.state.temporaryBook.bookBuyLink,
              },
            })
          );
      }
    );
  };

  handleThirdButton = () => {
    this.props.modalAction(false);
    this.setState({
      categoryList: [],
      steps: {
        stepOne: true,
        stepTwo: false,
        stepTree: false,
      },
      openAdminModal: false,
    });
    axios.post(saveBookUrl, this.state.book);
  };

  renderAdminModal = () => {
    return (
      <Modal
        onClose={this.handleModalOnClose}
        className="modal-height"
        open={this.props.modal}
      >
        <BookSaveStep steps={this.state.steps} />

        {this.state.steps.stepOne && (
          <div>
            <Modal.Content image>
              <Image
                className="card-image"
                src={this.state.book.bookThumbnail}
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
                      categoryList: [
                        ...this.state.categoryList,
                        { categoryDescription: this.state.bookCategory },
                      ],
                      bookCategory: "",
                    });
                  }}
                >
                  +
                </Button>
                {this.state.categoryList.map((category) => (
                  <Label key={category.categoryDescription} as="a">
                    {category.categoryDescription}
                    <Icon
                      onClick={() => {
                        let filteredCategory = this.state.categoryList.filter(
                          (categoryName) =>
                            categoryName.categoryDescription !==
                            category.categoryDescription
                        );
                        this.setState({ categoryList: filteredCategory });
                      }}
                      name="delete"
                    />
                  </Label>
                ))}

                <Form.TextArea
                  value={this.state.book.bookDescription}
                  onChange={(event) =>
                    this.setState({
                      book: {
                        ...this.state.book,
                        bookDescription: event.target.value,
                      },
                    })
                  }
                  label="Açıklama"
                  placeholder="Açıklama giriniz..."
                />
              </Form>
            </Modal.Content>
            <Button onClick={this.handleFirstButton}>stepTwo</Button>
          </div>
        )}

        {this.state.steps.stepTwo && (
          <div>
            <Form>
              <Form.Input
                label={"Yazar Adı"}
                value={this.state.authorOne.authorName}
                onChange={(event) =>
                  this.setState({
                    authorOne: {
                      ...this.state.authorOne,
                      authorName: event.target.value,
                    },
                  })
                }
                placeholder={"Yazar Adı Giriniz..."}
              />
              <Form.Input
                label={"Fotoğraf Url Adresi"}
                value={this.state.authorOne.authorThumbnail}
                onChange={(event) =>
                  this.setState({
                    authorOne: {
                      ...this.state.authorOne,
                      authorThumbnail: event.target.value,
                    },
                  })
                }
                placeholder={"Url Adresi Giriniz..."}
              />
              <Form.TextArea
                value={this.state.authorOne.authorBio}
                onChange={(event) =>
                  this.setState({
                    authorOne: {
                      ...this.state.authorOne,
                      authorBio: event.target.value,
                    },
                  })
                }
                label="Açıklama"
                placeholder="Açıklama giriniz..."
              />
              <Form.Input
                label={"Yazar Adı"}
                value={this.state.authorTwo.authorName}
                onChange={(event) =>
                  this.setState({
                    authorTwo: {
                      ...this.state.authorTwo,
                      authorName: event.target.value,
                    },
                  })
                }
                placeholder={"Yazar Adı Giriniz..."}
              />
              <Form.Input
                label={"Fotoğraf Url Adresi"}
                value={this.state.authorTwo.authorThumbnail}
                onChange={(event) =>
                  this.setState({
                    authorTwo: {
                      ...this.state.authorTwo,
                      authorThumbnail: event.target.value,
                    },
                  })
                }
                placeholder={"Url Adresi Giriniz..."}
              />
              <Form.TextArea
                value={this.state.authorTwo.authorBio}
                onChange={(event) =>
                  this.setState({
                    authorTwo: {
                      ...this.state.authorTwo,
                      authorBio: event.target.value,
                    },
                  })
                }
                label="Açıklama"
                placeholder="Açıklama giriniz..."
              />
            </Form>

            <Button onClick={this.handleSecondButton}>stepTree</Button>
          </div>
        )}

        {this.state.steps.stepTree && (
          <div>
            <Form>
              <Form.Input
                label={"E-Kitap indirme linki"}
                value={this.state.book.bookPdfDownloadLink}
                onChange={(event) =>
                  this.setState({
                    book: {
                      ...this.state.book,
                      bookPdfDownloadLink: event.target.value,
                    },
                  })
                }
                placeholder={"Url Adresi Giriniz..."}
              />
              <Form.Input
                label={"E-Kitap satın alma linki"}
                value={this.state.book.bookBuyLink}
                onChange={(event) =>
                  this.setState({
                    book: {
                      ...this.state.book,
                      bookBuyLink: event.target.value,
                    },
                  })
                }
                placeholder={"Url Adresi Giriniz..."}
              />
              <Form.Input
                label={"Kitap fiyatını giriniz"}
                value={this.state.book.bookPrice}
                onChange={(event) =>
                  this.setState({
                    book: {
                      ...this.state.book,
                      bookPrice: event.target.value,
                    },
                  })
                }
                placeholder={"Fiyatı giriniz..."}
              />
              <Form.Input
                label={"Stok miktarını giriniz"}
                value={this.state.book.bookStock}
                onChange={(event) =>
                  this.setState({
                    book: {
                      ...this.state.book,
                      bookStock: event.target.value,
                    },
                  })
                }
                placeholder={"Fiyatı giriniz..."}
              />
              <Button onClick={this.handleThirdButton}>close tab</Button>
            </Form>
          </div>
        )}
      </Modal>
    );
  };

  render() {
    return <div>{this.renderAdminModal()}</div>;
  }
}
const mapStateToProps = (state) => {
  const { modal, book } = state;

  return { modal: modal, book: book };
};

export default connect(mapStateToProps, { modalAction })(SaveBook);
