import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Card, Item } from "semantic-ui-react";
import { shoppingCartBooksUrl, totalPriceUrl } from "../all_api/constants";
import ShoppingCartCard from "./ShoppingCartCard";
import "../styles/ShoppingCart.css";

export class ShoppingCart extends Component {
  state = {
    shoppingCart: [],
    orderBooks: [],
    priceResponse: {},
  };

  async componentDidMount() {
    await this.setState({ orderBooks: this.props.order });
    axios.get(totalPriceUrl).then((response) =>
      this.setState({
        priceResponse: response.data,
      })
    );
  }

  handleUpdate = () => {
    axios.get(totalPriceUrl).then((response) =>
      this.setState({
        priceResponse: response.data,
      })
    );
  };

  handleRemove = (bookId) => {
    let filteredBooks = this.state.orderBooks.filter(
      (book) => book.book.bookId !== bookId
    );
    this.setState({
      orderBooks: filteredBooks,
    });
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={3}>
              <h2>Sepetim ( {this.state.orderBooks.length} ürün )</h2>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={6}>
              {this.state.orderBooks
                ? this.state.orderBooks.map((orderBook) => (
                    <Grid.Row>
                      <ShoppingCartCard
                        book={orderBook}
                        remove={this.handleRemove}
                        update={this.handleUpdate}
                      />
                    </Grid.Row>
                  ))
                : ""}
            </Grid.Column>
            <Grid.Column width={6}>
              <Card className="order-price">
                <Card.Content>
                  <Card.Header textAlign="left">Sipariş Özeti</Card.Header>
                  <Card.Meta textAlign="left">
                    {this.state.orderBooks.length} ürün
                  </Card.Meta>
                  .
                  <Card.Header className="cardHeader" textAlign="left">
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>Ara Toplam</Grid.Column>
                        <Grid.Column width={4}>
                          {this.state.priceResponse.price} TL
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>Kargo</Grid.Column>
                        <Grid.Column width={4}>
                          {this.state.priceResponse.cargo
                            ? this.state.priceResponse.cargo.cargoPrice
                            : ""}{" "}
                          TL
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Header>
                </Card.Content>

                <Card.Content>
                  <Card.Header className="cardHeader" textAlign="left">
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>Toplam</Grid.Column>
                        <Grid.Column width={4}>
                          {this.state.priceResponse.totalPrice} TL
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Header>{" "}
                  <Button
                    onClick={() => this.props.history.push("/order")}
                    className="orderButton"
                    fluid
                    color="orange"
                  >
                    Satın Al
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { security, order } = state;
  return {
    security: security,
    order: order,
  };
};

export default connect(mapStateToProps, null)(ShoppingCart);
