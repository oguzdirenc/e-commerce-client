import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Comment,
  Form,
  Header,
  Modal,
  Rating,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { newCommentUrl, getBookCommentsUrl } from "../all_api/constants";

export default class Comments extends Component {
  state = {
    comment: {
      commentDescription: "",
      rate: 0,
    },
    comments: [],
    ratingModalOpen: false,
  };

  async componentDidMount() {
    await axios
      .get(`${getBookCommentsUrl}/${this.props.bookId}`)
      .then((response) => this.setState({ comments: response.data }));
  }

  handleNewComment = async () => {
    if (
      this.state.comment.rate === 0 ||
      this.state.comment.commentDescription.length === 0
    ) {
      this.setState({ ratingModalOpen: true });
    } else {
      await axios
        .post(`${newCommentUrl}/${this.props.bookId}`, this.state.comment)
        .catch((error) => {
          console.log(error);
        });
      await axios
        .get(`${getBookCommentsUrl}/${this.props.bookId}`)
        .then((response) => this.setState({ comments: response.data }));
    }
  };

  handleCommentRate = async (event, data) => {
    await this.setState({
      comment: { ...this.state.comment, rate: data.rating },
    });
  };

  renderNoRatingModal = () => {
    let text = "";

    if (this.state.comment.rate === 0) text = "Lütfen puan verin.";
    if (this.state.comment.commentDescription.length === 0)
      text = "Lütfen bir yorum yazın.";

    return (
      <Modal
        closeIcon
        onClose={() => this.setState({ ratingModalOpen: false })}
        onOpen={() => this.setState({ ratingModalOpen: true })}
        open={this.state.ratingModalOpen}
        size="tiny"
      >
        <Modal.Header>Uyarı</Modal.Header>
        <Modal.Content>
          <p>{text}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() => this.setState({ ratingModalOpen: false })}
          >
            Tamam
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    return (
      <Segment textAlign="left" basic>
        <Comment.Group>
          <Header textAlign="left" as="h3" dividing>
            Yorumlar
          </Header>
          {this.state.comments.map((comment) => (
            <Comment>
              <Comment.Avatar src="/avatar.png" />
              <Comment.Content>
                <Comment.Author as="a">{comment.user.fullName}</Comment.Author>
                <Comment.Metadata>
                  <Rating
                    style={{ marginLeft: "10px" }}
                    size="mini"
                    icon="star"
                    defaultRating={comment.rate}
                    maxRating={5}
                    disabled
                  />
                </Comment.Metadata>
                <Comment.Text>{comment.commentDescription}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <Rating
            style={{ marginTop: "30px" }}
            icon="star"
            size="massive"
            maxRating={5}
            rating={this.state.comment.rate}
            onRate={this.handleCommentRate}
          />

          <Form reply>
            <Form.TextArea
              rows={2}
              onChange={(event) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    commentDescription: event.target.value,
                  },
                })
              }
            />
            <Button
              onClick={this.handleNewComment}
              content="Yorum ekle"
              labelPosition="left"
              icon="edit"
              color="orange"
            />
          </Form>
        </Comment.Group>
        {this.renderNoRatingModal()}
      </Segment>
    );
  }
}
