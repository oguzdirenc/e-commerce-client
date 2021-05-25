import React, { Component } from "react";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Grid,
  Icon,
  Input,
  Label,
  Menu,
  Rating,
  Segment,
  Sticky,
} from "semantic-ui-react";
import {
  filterBookUrl,
  getAllBooksUrl,
  shoppingCartBooksUrl,
} from "../all_api/constants";
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
    filter: { category: "", maxPrice: null, minPrice: null },
  };

  async componentDidMount() {
    await axios.get(shoppingCartBooksUrl).then((response) =>
      this.setState({
        books: response.data,
      })
    );

    this.props.orderAction(this.state.books);

    axios.get(getAllBooksUrl).then((response) => {
      console.log(response.data);
      this.setState({
        books: response.data,
        booksShown: response.data,
      });
    });
  }

  handleFilterClick = () => {
    axios.post(filterBookUrl, this.state.filter).then((response) => {
      this.setState({
        books: response.data,
        booksShown: response.data,
      });
    });
  };

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

  onChangeFollower = (event, data) => {
    this.setState({
      filter: { ...this.state.filter, categoryFilter: data.value },
    });
  };

  handleRemoveFilter = () => {
    axios.get(getAllBooksUrl).then((response) => {
      console.log(response.data);
      this.setState({
        books: response.data,
        booksShown: response.data,
        filter: { category: "", maxPrice: null, minPrice: null },
      });
    });
  };

  handleRemove = (bookId) => {
    let filteredBooks = this.state.books.filter(
      (book) => book.bookId !== bookId
    );
    this.setState({ books: filteredBooks });
  };
  currentTime = Date.now() / 1000;

  render() {
    const options = [
      { key: 1, text: "Kategori", value: "Kategori" },
      { key: 2, text: "Dünya Klasikleri", value: "Dünya Klasikleri" },
      { key: 3, text: "Psikoloji", value: "Psikoloji" },
      { key: 4, text: "Tarih", value: "Tarih" },
      { key: 5, text: "Aşk", value: "Aşk" },
      { key: 6, text: "Siyaset-Politika", value: "Siyaset-Politika" },
      { key: 7, text: "Kişisel Gelişim", value: "Kişisel Gelişim" },
      { key: 8, text: "Macera-Aksiyon", value: "Macera-Aksiyon" },
      { key: 9, text: "Felsefe", value: "Felsefe" },
      { key: 10, text: "Korku-Gerilim", value: "Korku-Gerilim" },
      { key: 11, text: "Polisiye", value: "Polisiye" },
      { key: 12, text: "Fantastik", value: "Fantastik" },
      { key: 13, text: "Eğitim", value: "Eğitim" },
      { key: 14, text: "Spor", value: "Spor" },
      { key: 15, text: "Gezi", value: "Gezi" },
      { key: 16, text: "Yemek", value: "Yemek" },
      { key: 17, text: "Dergi", value: "Dergi" },
    ];
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Sticky>
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
                        <h5>Kategoriler</h5>
                        <Dropdown
                          placeholder="Kategoriler"
                          fluid
                          selection
                          onChange={this.onChangeFollower}
                          options={options}
                        />
                        <h5>Fiyat Aralığı</h5>
                        <Input
                          className="filterInput"
                          size="small"
                          placeholder="min"
                          value={this.state.filter.minPrice}
                          onChange={(event) => {
                            this.setState({
                              filter: {
                                ...this.state.filter,
                                minPrice: event.target.value,
                              },
                            });
                          }}
                        />
                        <Icon name="try" />
                        <Input
                          className="filterInput"
                          size="small"
                          placeholder="max"
                          value={this.state.filter.maxPrice}
                          onChange={(event) => {
                            this.setState({
                              filter: {
                                ...this.state.filter,
                                maxPrice: event.target.value,
                              },
                            });
                          }}
                        />
                        <Icon name="try" />
                        <Label
                          className="filterButton"
                          as={Button}
                          color="blue"
                          onClick={this.handleFilterClick}
                        >
                          Filtrele
                        </Label>
                        <Label
                          className="filterButton"
                          as={Button}
                          color="red"
                          secondary
                          onClick={this.handleRemoveFilter}
                        >
                          Filtreyi Kaldır
                        </Label>
                      </Segment>
                    </Sticky>
                  </Grid.Column>
                  <Grid.Column width={12}>
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
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
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
