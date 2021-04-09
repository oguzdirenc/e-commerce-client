import React, { Component } from "react";
import { Button, Card, Container } from "semantic-ui-react";
import { getAllBooksUrl } from "../all_api/constants";
import axios from "axios";
import BookCard from "./BookCard";
import "../styles/BookCard.css";

export class AllBooks extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    axios.get(getAllBooksUrl).then((response) =>
      this.setState({
        books: response.data,
      })
    );
  }

  handleRemove = (bookId) => {
    let filteredBooks = this.state.books.filter(
      (book) => book.bookId !== bookId
    );
    this.setState({ books: filteredBooks });
  };
  currentTime = Date.now() / 1000;

  render() {
    return (
      <div>
        <Button onClick={() => console.log(this.currentTime)}>Date</Button>
        <Container>
          <Card.Group className="card-group">
            {this.state.books.map((book) => (
              <BookCard
                cardType="user"
                key={book.bookId}
                book={book}
                remove={this.handleRemove}
              />
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default AllBooks;
