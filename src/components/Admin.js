import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { apiUrl, key } from "../all_api/api";
import { Card, Container } from "semantic-ui-react";
import BookCard from "./BookCard";
import "../styles/BookCard.css";
import "../styles/Admin.css";
import { connect } from "react-redux";
import SaveBook from "./SaveBook";
import { modalAction } from "../redux/actions/modalAction";

class Admin extends Component {
  state = {
    books: [],
    bookSearch: "",
    authorsList: [],
    loading: false,
    modalOpen: false,
  };

  handleAdminBookSearch = () => {
    this.setState({
      books: [],
    });

    axios.get(apiUrl + this.state.bookSearch + key).then((response) =>
      response.data.items.map((googleBook) => {
        this.setState({
          books: [
            ...this.state.books,
            {
              bookName: googleBook.volumeInfo.title
                ? googleBook.volumeInfo.title
                : null,
              bookThumbnail: googleBook.volumeInfo.imageLinks
                ? googleBook.volumeInfo.imageLinks.smallThumbnail
                  ? googleBook.volumeInfo.imageLinks.smallThumbnail
                  : googleBook.volumeInfo.imageLinks.thumbnail
                  ? googleBook.volumeInfo.imageLinks.thumbnail
                  : "https://nordicdesign.ca/wp-content/uploads/2020/02/book-thumbnail-300x300.jpg"
                : "https://nordicdesign.ca/wp-content/uploads/2020/02/book-thumbnail-300x300.jpg",
              authorsList: googleBook.volumeInfo.authors
                ? googleBook.volumeInfo.authors[1]
                  ? [
                      googleBook.volumeInfo.authors[0],
                      googleBook.volumeInfo.authors[1],
                    ]
                  : [googleBook.volumeInfo.authors[0], ""]
                : ["", ""],
              publisherName: googleBook.volumeInfo.publisher
                ? googleBook.volumeInfo.publisher
                : "",
              publishedDate: googleBook.volumeInfo.publishedDate
                ? googleBook.volumeInfo.publishedDate
                : "",
              bookDescription: googleBook.volumeInfo.description
                ? googleBook.volumeInfo.description
                : "",
              bookPage: googleBook.volumeInfo.pageCount
                ? googleBook.volumeInfo.pageCount
                : null,
              bookPdfDownloadLink: googleBook.volumeInfo.pdf
                ? googleBook.volumeInfo.pdf.downloadLink
                  ? googleBook.volumeInfo.pdf.downloadLink
                  : null
                : null,
              bookBuyLink: googleBook.saleInfo.buyLink
                ? googleBook.saleInfo.buyLink
                : null,
            },
          ],
        });
      })
    );
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleAdminBookSearch}>
          <Input
            className="search-bar"
            onChange={(event) =>
              this.setState({
                bookSearch: event.target.value,
              })
            }
            placeholder="Ara ..."
          ></Input>
          <Button
            className="search-button"
            onClick={this.handleAdminBookSearch}
          >
            Search
          </Button>
        </Form>
        <Container>
          <Card.Group className="card-group" centered>
            {this.state.books.map((book) => (
              <BookCard
                cardType="admin"
                book={book}
                authorsList={this.state.authorsList}
              />
            ))}
          </Card.Group>
        </Container>
        <Button onClick={() => this.props.modalAction(true)}>Kitap Ekle</Button>
        <SaveBook />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { book } = state;

  return { book: book };
};

export default connect(mapStateToProps, { modalAction })(Admin);
