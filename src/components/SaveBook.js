import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Image,
  Modal,
  Label,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import BookSaveStep from "./BookSaveStep";
import { modalAction } from "../redux/actions/modalAction";
import {
  saveBookUrl,
  updateBookUrl,
  categoryToBookUrl,
  putAuthorToBookUrl,
} from "../all_api/constants";
import "../styles/SaveBook.css";

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
    errors: {},
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
      errors: {},
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
      bookDescription,
    } = this.state.book;

    try {
      await axios
        .post(saveBookUrl, {
          bookName: bookName,
          bookThumbnail: bookThumbnail,
          publishedDate: publishedDate,
          publisherName: publisherName,
          bookPage: bookPage,
          bookDescription: bookDescription,
        })
        .then((response) => {
          this.setState({
            book: response.data,
          });
        });

      await axios.post(
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
          authorName:
            this.state.authorsList != null && this.state.authorsList[0]
              ? this.state.authorsList[0]
              : "",
        },
        authorTwo: {
          authorName:
            this.state.authorsList != null && this.state.authorsList[1]
              ? this.state.authorsList[1]
              : "",
        },
      });
    } catch (err) {
      this.setState({
        errors: err.response.data,
      });
    }
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
                bookPdfDownloadLink:
                  this.state.temporaryBook.bookPdfDownloadLink,
                bookBuyLink: this.state.temporaryBook.bookBuyLink,
              },
            })
          );
      }
    );
  };

  handleThirdButton = () => {
    if (
      this.state.book.bookPrice <= 0 ||
      Number.isNaN(Number(this.state.book.bookPrice))
    ) {
      this.setState({
        errors: {
          bookPrice: "Geçerli bir fiyat giriniz",
        },
      });
    } else if (
      this.state.book.bookStock <= 0 ||
      Number.isNaN(Number(this.state.book.bookStock))
    ) {
      this.setState({
        errors: {
          bookStock: "Geçerli bir stok miktarı giriniz",
        },
      });
    } else {
      this.props.modalAction(false);
      this.setState({
        errors: {},
        categoryList: [],
        steps: {
          stepOne: true,
          stepTwo: false,
          stepTree: false,
        },
        openAdminModal: false,
      });
      axios.post(updateBookUrl, this.state.book);
    }
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
            <Modal.Content className="conteiner-1" image>
              <Image
                className="conteiner-2 book-image"
                className="card-image"
                src={this.state.book.bookThumbnail}
                wrapped
              />

              <Form className="conteiner-3">
                <div className="input">
                  <label className="label-book">Kitap Adı :</label>

                  <Input
                    className={"input-width"}
                    value={this.state.book.bookName}
                    onChange={(event) =>
                      this.setState({
                        book: {
                          ...this.state.book,
                          bookName: event.target.value,
                        },
                      })
                    }
                    placeholder="Kitap adını giriniz..."
                  />
                </div>
                {this.state.errors.bookName ? (
                  <h6 className="error">{this.state.errors.bookName}</h6>
                ) : (
                  ""
                )}
                <div className="input">
                  <label className="label-book">Fotoğraf Url Adresi :</label>
                  <Input
                    className="input-width"
                    value={this.state.book.bookThumbnail}
                    onChange={(event) =>
                      this.setState({
                        book: {
                          ...this.state.book,
                          bookThumbnail: event.target.value,
                        },
                      })
                    }
                    placeholder="Url adresini giriniz..."
                  />
                </div>

                <div className="input">
                  <label className="label-book">Yayınevi Adı :</label>
                  <Input
                    className="input-width"
                    value={this.state.book.publisherName}
                    onChange={(event) =>
                      this.setState({
                        book: {
                          ...this.state.book,
                          publisherName: event.target.value,
                        },
                      })
                    }
                    placeholder="Yayınevi giriniz..."
                  />
                </div>
                <div className="input">
                  <label className="label-book">Yayınlanma Tarihi :</label>
                  <Input
                    className="input-width"
                    value={this.state.book.publishedDate}
                    onChange={(event) =>
                      this.setState({
                        book: {
                          ...this.state.book,
                          publishedDate: event.target.value,
                        },
                      })
                    }
                    placeholder="Yayınlanma tarihi giriniz..."
                  />
                </div>

                <div className="input">
                  <label className="label-book">Sayfa Sayısı :</label>
                  <Input
                    className="input-width"
                    value={this.state.book.bookPage}
                    onChange={(event) =>
                      this.setState({
                        book: {
                          ...this.state.book,
                          bookPage: event.target.value,
                        },
                      })
                    }
                    placeholder="Sayfa sayısını giriniz..."
                  />
                </div>
                {this.state.errors.bookPage ? (
                  <h6 className="error">{this.state.errors.bookPage}</h6>
                ) : (
                  ""
                )}
                <div className="input">
                  <label className="label-book">Kategori :</label>
                  <Input
                    className="category-width"
                    value={this.state.bookCategory}
                    onChange={(event) =>
                      this.setState({
                        bookCategory: event.target.value,
                      })
                    }
                    placeholder="Kategori giriniz..."
                  />

                  <Button
                    className="category-button-width"
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
                </div>
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
              </Form>
            </Modal.Content>
            <label className="label-book description">Açıklama :</label>
            <TextArea
              className="description"
              rows="10"
              value={this.state.book.bookDescription}
              onChange={(event) =>
                this.setState({
                  book: {
                    ...this.state.book,
                    bookDescription: event.target.value,
                  },
                })
              }
              placeholder="Açıklama giriniz..."
            />

            <Button className="button-align" onClick={this.handleFirstButton}>
              Kitap Oluştur
            </Button>
          </div>
        )}

        {this.state.steps.stepTwo && (
          <div>
            <Form>
              <div className="third-step author-border">
                <div className="second-input">
                  <label className="second-label">Yazar Adı :</label>
                  <Input
                    value={this.state.authorOne.authorName}
                    className="second-category-width"
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
                </div>
                <div className="second-input">
                  <label className="second-label">Fotoğraf Url Adresi :</label>
                  <Input
                    className="second-category-width"
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
                </div>

                <label className="second-label description">
                  Yazar Biyografisi :
                </label>
                <TextArea
                  value={this.state.authorOne.authorBio}
                  onChange={(event) =>
                    this.setState({
                      authorOne: {
                        ...this.state.authorOne,
                        authorBio: event.target.value,
                      },
                    })
                  }
                  className="description"
                  rows="4"
                  placeholder="Açıklama giriniz..."
                />
              </div>

              <div className="third-step author-border">
                <div className="second-input">
                  <label className="second-label">Yazar Adı :</label>
                  <Input
                    className="second-category-width"
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
                </div>
                <div className="second-input">
                  <label className="second-label">Fotoğraf Url Adresi :</label>
                  <Form.Input
                    className="second-category-width"
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
                </div>

                <label className="second-label description">
                  Yazarın Biyografisi :
                </label>
                <TextArea
                  value={this.state.authorTwo.authorBio}
                  onChange={(event) =>
                    this.setState({
                      authorTwo: {
                        ...this.state.authorTwo,
                        authorBio: event.target.value,
                      },
                    })
                  }
                  className="description"
                  rows="4"
                  placeholder="Açıklama giriniz..."
                />
              </div>
            </Form>

            <Button className="button-align" onClick={this.handleSecondButton}>
              Yazar Ekle
            </Button>
          </div>
        )}

        {this.state.steps.stepTree && (
          <div className="third-step">
            <Form>
              <div className="second-input">
                <label className="second-label">E-Kitap İndirme Linki :</label>
                <Input
                  className="second-category-width"
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
              </div>
              <div className="second-input">
                <label className="second-label">
                  E-Kitap Satın Alma Linki :
                </label>
                <Input
                  className="second-category-width"
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
              </div>
              <div className="second-input">
                <label className="second-label">Kitap Fiyatı :</label>
                <Input
                  className="second-category-width"
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
              </div>
              {this.state.errors.bookPrice ? (
                <h6 className="error">{this.state.errors.bookPrice}</h6>
              ) : (
                ""
              )}
              <div className="second-input">
                <label className="second-label">Stok Miktarı :</label>
                <Input
                  className="second-category-width"
                  value={this.state.book.bookStock}
                  onChange={(event) =>
                    this.setState({
                      book: {
                        ...this.state.book,
                        bookStock: event.target.value,
                      },
                    })
                  }
                  placeholder={"Stok miktarını giriniz..."}
                />
              </div>
              {this.state.errors.bookStock ? (
                <h6 className="error">{this.state.errors.bookStock}</h6>
              ) : (
                ""
              )}
              <Button className="button-align" onClick={this.handleThirdButton}>
                Kaydı Tamamla
              </Button>
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
