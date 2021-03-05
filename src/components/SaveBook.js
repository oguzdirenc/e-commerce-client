import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Icon, Image, Modal, Label, Form } from "semantic-ui-react";
import BookSaveStep from "./BookSaveStep";
import { modalAction } from "../redux/actions/modalAction";
import { saveBookUrl, categoryToBookUrl } from "../all_api/constants";

class SaveBook extends Component {
  state = {
    steps: { stepOne: true, stepTwo: false, stepTree: false },
    categoryList: [],
    bookCategory: "",
    book: {},
    authorOne: "",
    authorTwo: "",
    authorOneDesc: "",
    authorTwoDesc: "",
    authorOneUrl: "",
    authorTwoUrl: "",
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      book: nextProps.book,
    });
  }
  handleModalOnClose = () => {
    this.props.modalAction(false);
    this.setState({
      steps: { stepOne: true, stepTwo: false, stepTree: false },
      book: {},
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
      authorsList,
    } = this.state.book;
    {
      this.state.book.authorsList[0]
        ? this.setState({
            authorOne: this.state.book.authorsList[0].authorName,
          })
        : this.setState({
            authorOne: "",
          });
    }
    {
      this.state.book.authorsList[1]
        ? this.setState({
            authorTwo: this.state.book.authorsList[1].authorName,
          })
        : this.setState({
            authorTwo: "",
          });
    }

    await axios
      .post(saveBookUrl, {
        bookName: bookName,
        bookThumbnail: bookThumbnail,
        publishedDate: publishedDate,
        publisherName: publisherName,
        bookPage: bookPage,
        description: description,
        authorsList: authorsList,
      })
      .then((response) => {
        this.setState({
          book: response.data,
        });
      });

    axios
      .post(
        `${categoryToBookUrl}/${this.state.book.bookId}`,
        this.state.categoryList
      )
      .then((response) =>
        this.setState({
          book: response.data,
        })
      );

    this.setState({
      steps: {
        stepOne: false,
        stepTwo: true,
        stepTree: false,
      },
    });

    console.log(this.state.categoryList);
  };

  handleSecondButton = () => {
    this.setState({
      steps: {
        stepOne: false,
        stepTwo: false,
        stepTree: true,
      },
    });
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
            <Button onClick={this.handleFirstButton}>stepTwo</Button>
          </div>
        )}

        {this.state.steps.stepTwo && (
          <div>
            <Form>
              <Form.Input
                label={"Yazar Adı"}
                value={this.state.authorOne}
                onChange={(event) =>
                  this.setState({
                    authorOne: event.target.value,
                  })
                }
                placeholder={"Yazar Adı Giriniz..."}
              />
              <Form.Input
                label={"Fotoğraf Url Adresi"}
                value={this.state.authorOneUrl}
                onChange={(event) =>
                  this.setState({
                    authorOneUrl: event.target.value,
                  })
                }
                placeholder={"Url Adresi Giriniz..."}
              />
              <Form.TextArea
                value={this.state.authorOneDesc}
                onChange={(event) =>
                  this.setState({
                    authorOneDesc: event.target.value,
                  })
                }
                label="Açıklama"
                placeholder="Açıklama giriniz..."
              />
              <Form.Input
                label={"Yazar Adı"}
                value={this.state.authorTwo}
                onChange={(event) =>
                  this.setState({
                    authorTwo: event.target.value,
                  })
                }
                placeholder={"Yazar Adı Giriniz..."}
              />
              <Form.Input
                label={"Fotoğraf Url Adresi"}
                value={this.state.authorTwoUrl}
                onChange={(event) =>
                  this.setState({
                    authorTwoUrl: event.target.value,
                  })
                }
                placeholder={"Url Adresi Giriniz..."}
              />
              <Form.TextArea
                value={this.state.authorTwoDesc}
                onChange={(event) =>
                  this.setState({
                    authorTwoDesc: event.target.value,
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
            <Button
              onClick={() => {
                this.props.modalAction(false);
                this.setState({
                  steps: {
                    stepOne: true,
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
    return <div>{this.renderAdminModal()}</div>;
  }
}
const mapStateToProps = (state) => {
  const { modal, book } = state;

  return { modal: modal, book: book };
};

export default connect(mapStateToProps, { modalAction })(SaveBook);
