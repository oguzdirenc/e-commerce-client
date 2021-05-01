import React, { Component } from "react";
import { Button, Card, Container } from "semantic-ui-react";
import { getAllBooksUrl, shoppingCartBooksUrl } from "../all_api/constants";
import axios from "axios";
import BookCard from "./BookCard";
import { orderAction } from "../redux/actions/orderAction";
import "../styles/BookCard.css";
import { connect } from "react-redux";

export class AllBooks extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    await axios.get(shoppingCartBooksUrl).then((response) =>
      this.setState({
        books: response.data,
      })
    );

    this.props.orderAction(this.state.books);

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

export default connect(null, {
  orderAction,
})(AllBooks);
