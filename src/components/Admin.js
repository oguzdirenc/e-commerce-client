import axios from "axios";
import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import { apiUrl, key } from "../all_api/api";
import { Card, Container } from "semantic-ui-react";
import BookCard from "./BookCard";

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
        /* this.setState({
          temporaryAuthorsList: googleBook.volumeInfo.authors,
        });

        this.state.temporaryAuthorsList.map((author) =>
          this.setState({
            authorsList: [
              ...this.state.authorsList,
              { authorName: author.get },
            ],
          })
        );*/

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
        <Input
          onChange={(event) =>
            this.setState({
              bookSearch: event.target.value,
            })
          }
          placeholder="Search ..."
        ></Input>
        <Button onClick={this.handleAdminBookSearch}>Search</Button>
        <Container>
          <Card.Group>
            {this.state.books.map((book) => (
              <BookCard book={book} />
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default Admin;
