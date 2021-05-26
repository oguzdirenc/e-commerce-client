import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Comment,
  Form,
  Grid,
  GridRow,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Modal,
  Rating,
  Segment,
} from "semantic-ui-react";
import {
  addToShoppingCartUrl,
  shoppingCartBooksUrl,
} from "../all_api/constants";
import { orderAction } from "../redux/actions/orderAction";
import "../styles/BookDetails.css";
import Comments from "./Comments";

export class BookDetails extends Component {
  state = {
    book: {},
    modal: false,
  };

  componentDidMount() {
    this.setState({
      book: this.props.location.params.book,
    });
  }

  handleAddToShoppingCart = async () => {
    try {
      await axios.post(`${addToShoppingCartUrl}/${this.state.book.bookId}`);

      await axios.get(shoppingCartBooksUrl).then((response) => {
        this.props.orderAction(response.data);
        this.setState({ modal: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { book } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={5}>
                      <Image size="small" src={book.bookThumbnail}></Image>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Header as="h2">{book.bookName}</Header>
                      {book.bookRate ? (
                        <div className="input">
                          <Rating
                            icon="star"
                            defaultRating={book.bookRate}
                            maxRating={5}
                            disabled
                          />
                          <span size="small" className="bookDetail-header">
                            {book.bookRate} - {book.commentCount} Kişi
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {book.bookAuthorsList ? (
                        <div className="input">
                          <label className="bookDetail-label">Yazar :</label>
                          <span size="small" className="bookDetail-header">
                            {book.bookAuthorsList[0].authorName}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {book.bookPage ? (
                        <div className="input">
                          <label className="bookDetail-label">Sayfa :</label>
                          <span size="small" className="bookDetail-header">
                            {book.bookPage}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {book.publisherName ? (
                        <div className="input">
                          <label className="bookDetail-label">Yayınevi :</label>
                          <span size="small" className="bookDetail-header">
                            {book.publisherName}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {book.categoryBooksList ? (
                        book.categoryBooksList.length != 0 ? (
                          <div className="input">
                            <label className="bookDetail-label">
                              Kategori :
                            </label>

                            {book.categoryBooksList.map((category) => (
                              <span size="small" className="bookDetail-header">
                                {category.categoryDescription}
                              </span>
                            ))}
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                      {book.bookBuyLink ? (
                        <div className="input">
                          <Icon color="blue" name="linkify"></Icon>
                          <Label className="bookLinkBg">
                            <a
                              href={book.bookBuyLink}
                              className="bookDetail-label"
                            >
                              E-Kitap satın al
                            </a>
                          </Label>
                        </div>
                      ) : (
                        ""
                      )}
                      {book.bookPdfDownloadLink ? (
                        <div className="input">
                          <Icon color="blue" name="linkify"></Icon>
                          <Label className="bookLinkBg">
                            <a
                              href={book.bookPdfDownloadLink}
                              className="bookDetail-label"
                            >
                              E-Kitap satın indir
                            </a>
                          </Label>
                        </div>
                      ) : (
                        ""
                      )}
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={6}></Grid.Column>

                          <Grid.Column width={10}>
                            <Header as="h2" className="bookDetail-price">
                              {book.bookPrice} TL
                            </Header>
                            <Button
                              fluid
                              color="orange"
                              size="large"
                              onClick={this.handleAddToShoppingCart}
                            >
                              Sepete Ekle
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={12}>
                      <Grid>
                        <Grid.Row>
                          <Header as="h2" floated="left">
                            Kitap Açıklaması
                          </Header>
                        </Grid.Row>
                        <Grid.Row>
                          {book.bookDescription ? (
                            <p className="bookDescription">
                              {book.bookDescription}
                            </p>
                          ) : (
                            <h5 className="bookDescription errorMessage">
                              Bu kitap hakkında bir özet bilgisi şu anda mevcut
                              değil
                            </h5>
                          )}
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <Comments bookId={this.props.location.params.book.bookId} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Modal
          open={this.state.modal}
          onClose={() => this.setState({ modal: false })}
          header="Tebrikler!"
          content="Kitap sepetinize eklendi."
          actions={[{ key: "Tamam", content: "Tamam", positive: true }]}
        />
      </div>
    );
  }
}

export default connect(null, { orderAction })(BookDetails);
