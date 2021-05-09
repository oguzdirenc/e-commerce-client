import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Grid,
  Button,
  Form,
  TextArea,
  Checkbox,
  Header,
  Segment,
} from "semantic-ui-react";
import { saveOrderUrl, totalPriceUrl } from "../all_api/constants";
import "../styles/Order.css";

export class Order extends Component {
  state = {
    priceResponse: {},
    orderBooks: [],
    orderRequest: {
      name: "",
      phone: "",
      deliveryAddress: "",
      invoiceAddress: "",
      totalPrice: 0,
      cargoPrice: 0,
    },
  };

  componentDidMount() {
    this.setState({ orderBooks: this.props.order });
    axios.get(totalPriceUrl).then((response) =>
      this.setState({
        priceResponse: response.data,
        orderRequest: {
          ...this.state.orderRequest,
          totalPrice: response.data.totalPrice,
          cargoPrice: response.data.cargo.cargoPrice,
        },
      })
    );
  }

  handleSaveOrder = () => {
    axios
      .post(saveOrderUrl, this.state.orderRequest)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Grid.Row>
                <Header color="orange" dividing floated="left">
                  Teslimat Bilgileri
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Segment className="order-segment">
                  <Form size="big" className="order-form">
                    <Form.Group widths="equal">
                      <Form.Field>
                        <label>Alıcı Adı</label>
                        <input
                          value={this.state.name}
                          onChange={(event) =>
                            this.setState({
                              orderRequest: {
                                ...this.state.orderRequest,
                                name: event.target.value,
                              },
                            })
                          }
                          placeholder="Alıcı Adı..."
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Telefon Numarası</label>
                        <input
                          value={this.state.phone}
                          onChange={(event) =>
                            this.setState({
                              orderRequest: {
                                ...this.state.orderRequest,
                                phone: event.target.value,
                              },
                            })
                          }
                          placeholder="Telefon Numarası..."
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Field
                      control={TextArea}
                      label="Teslimat Adresi"
                      placeholder="Teslimat Adresi..."
                      value={this.state.deliveryAddress}
                      onChange={(event) =>
                        this.setState({
                          orderRequest: {
                            ...this.state.orderRequest,
                            deliveryAddress: event.target.value,
                          },
                        })
                      }
                    />
                    <Form.Field
                      control={TextArea}
                      label="Fatura Adresi"
                      placeholder="Fatura Adresi..."
                      value={this.state.invoiceAddress}
                      onChange={(event) =>
                        this.setState({
                          orderRequest: {
                            ...this.state.orderRequest,
                            invoiceAddress: event.target.value,
                          },
                        })
                      }
                    />
                    <Form.Field
                      control={Checkbox}
                      label="Teslimat adresi, fatura adresi ile aynı"
                    />
                    <Button
                      onClick={this.handleSaveOrder}
                      className="orderButton"
                      fluid
                      color="orange"
                    >
                      Ödeme Yap
                    </Button>
                  </Form>
                </Segment>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card className="orderNow">
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
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { order } = state;
  return {
    order: order,
  };
};

export default connect(mapStateToProps, null)(Order);
