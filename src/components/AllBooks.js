import React, { Component } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Menu,
  Rating,
  Segment,
} from "semantic-ui-react";
import { getAllBooksUrl, shoppingCartBooksUrl } from "../all_api/constants";
import axios from "axios";
import BookCard from "./BookCard";
import { orderAction } from "../redux/actions/orderAction";
import "../styles/BookCard.css";
import { connect } from "react-redux";
import "../styles/AllBook.css";

export class AllBooks extends Component {
  state = {
    books: [],
    ratingFilter: 0,
    booksShown: [],
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
        booksShown: response.data,
      })
    );
  }

  handleRate = (event, data) => {
    this.setState({ ratingFilter: data.rating });
  };

  handleRatingInputChange = async (e) => {
    await this.setState({
      ratingFilter: e.target.value / 10,
    });

    if (this.state.ratingFilter != 0) {
      this.setState({
        booksShown: this.state.books.filter(
          (book) => this.state.ratingFilter < book.bookRate
        ),
      });
    } else {
      this.setState({ booksShown: this.state.books });
    }
  };

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
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Segment>
                <h5>En düşük puan: {this.state.ratingFilter}</h5>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={this.state.ratingFilter * 10}
                  onChange={this.handleRatingInputChange}
                />
                <Rating
                  style={{ display: "flex", marginTop: "10px" }}
                  icon="star"
                  maxRating={5}
                  rating={this.state.ratingFilter}
                  onRate={this.handleRate}
                  clearable
                />
              </Segment>
            </Grid.Column>
            <Grid.Column width={10}>
              <Container>
                <Card.Group className="card-group">
                  {this.state.booksShown.map((book) => (
                    <BookCard
                      cardType="user"
                      key={book.bookId}
                      book={book}
                      remove={this.handleRemove}
                    />
                  ))}
                </Card.Group>
              </Container>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { book } = state;

  return { book: book };
};
export default connect(mapStateToProps, {
  orderAction,
})(AllBooks);
