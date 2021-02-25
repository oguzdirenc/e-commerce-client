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
  };

  handleAdminBookSearch = () => {
    axios.get(apiUrl + this.state.bookSearch + key).then((response) =>
      this.setState({
        books: response.data.items,
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
