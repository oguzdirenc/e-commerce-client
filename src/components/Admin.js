import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { apiUrl, key } from "../all_api/api";
import { Card, Container } from "semantic-ui-react";
import BookCard from "./BookCard";
import "../styles/BookCard.css";
import "../styles/Admin.css";

class Admin extends Component {
  state = {
    books: [],
    bookSearch: "",
    authorsList: [],
    temporaryAuthorsList: [],
    loading: false,
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
                : "",
              bookThumbnail: googleBook.volumeInfo.imageLinks
                ? googleBook.volumeInfo.imageLinks.smallThumbnail
                  ? googleBook.volumeInfo.imageLinks.smallThumbnail
                  : googleBook.volumeInfo.imageLinks.thumbnail
                  ? googleBook.volumeInfo.imageLinks.thumbnail
                  : ""
                : "",
              authorsList: googleBook.volumeInfo.authors
                ? googleBook.volumeInfo.authors.map((author) => {
                    return { authorName: author };
                  })
                : "",
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
              <BookCard cardType="admin" book={book} />
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default Admin;
