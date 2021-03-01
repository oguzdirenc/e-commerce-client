import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Image, Modal, Label, Form } from "semantic-ui-react";
import BookSaveStep from "./BookSaveStep";
import { modalAction } from "../redux/actions/modalAction";

class SaveBook extends Component {
  state = {
    steps: { stepOne: true, stepTwo: false, stepTree: false },
    bookCategoryList: [],
    bookCategory: "",
    book: {},
  };

  componentDidMount() {
    this.setState({
      book: this.props.book,
    });
  }

  renderAdminModal = () => {
    return (
      <Modal
        onClose={() => this.props.modalAction(false)}
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
    return <div>{this.renderAdminModal()}</div>;
  }
}

const mapStateToProps = (state) => {
  const { modal, book } = state;

  return { modal: modal, book: book };
};

export default connect(mapStateToProps, { modalAction })(SaveBook);
