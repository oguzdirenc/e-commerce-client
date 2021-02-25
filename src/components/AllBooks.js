import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import { getAllBooksUrl } from "../allApi/constants";
import axios from "axios";
import BookCard from "./BookCard";

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

  render() {
    return (
      <div>
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

export default AllBooks;
