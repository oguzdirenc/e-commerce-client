import axios from "axios";
import React, { Component } from "react";
import { Card, Container, Message } from "semantic-ui-react";
import { getAllBooksUrl } from "../all_api/constants";
import { BookCard } from "./BookCard";
import "../styles/Search.css";

export default class Search extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    await axios.get(getAllBooksUrl).then((response) =>
      this.setState({
        books: response.data,
      })
    );
    this.setState({
      books: this.state.books.filter(
        (book) =>
          book.bookName.toUpperCase() ==
          this.props.match.params.bookName.toUpperCase()
      ),
    });
    console.log(this.props.match.params.bookName);
  }

  render() {
    return (
      <div>
        <Container>
          <Card.Group className="card-group">
            {this.state.books.length != 0 ? (
              this.state.books.map((book) => (
                <BookCard
                  cardType="user"
                  key={book.bookId}
                  book={book}
                  remove={this.handleRemove}
                />
              ))
            ) : (
              <Message
                className="notFound"
                error
                size="massive"
                header="Aradığınız kitap bulunamadı"
                list={["Kitap adını doğru yazdığınızdan emin olunuz."]}
              />
            )}
          </Card.Group>
        </Container>
      </div>
    );
  }
}
