import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Input, Segment } from "semantic-ui-react";
import { userDetailsUrl, updateUserUrl } from "../all_api/constants";
import "../styles/Profile.css";

class Profile extends Component {
  state = {
    updateRequest: {
      fullName: "",
      phoneNumber: 0,
      address: "",
    },
    user: {},
    error: "",
  };
  async componentDidMount() {
    try {
      await axios
        .get(userDetailsUrl)
        .then((r) => this.setState({ user: r.data }));
    } catch (error) {
      console.log(error);
    }
  }

  handleUpdateUser = async () => {
    try {
      await this.setState({
        updateRequest: {
          fullName: this.state.user.fullName,
          phoneNumber: this.state.user.userPhoneNumber,
          address: this.state.user.userAddress,
        },
      });
      await axios.post(updateUserUrl, this.state.updateRequest);
    } catch (error) {
      this.setState({ error: error.response.data });
    }
  };
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <div className="profileInput">
                  <label className="profileLabel">
                    Kullanıcı mail adresi :
                  </label>
                  <label className="profileLabel">
                    {this.state.user.username}
                  </label>
                </div>

                <div className="profileInput">
                  <label className="profileLabel">Kullanıcı adı :</label>
                  <Input
                    className="profileInput-width"
                    value={this.state.user.fullName}
                    onChange={(event) => {
                      this.setState({
                        user: {
                          ...this.state.user,
                          fullName: event.target.value,
                        },
                      });
                    }}
                    placeholder="Adınızı giriniz..."
                  />{" "}
                  {this.state.error ? (
                    <h6 className="error">{this.state.error}</h6>
                  ) : (
                    ""
                  )}
                </div>

                <div className="profileInput">
                  <label className="profileLabel">Telefon Numarası :</label>
                  <Input
                    className="profileInput-width"
                    value={this.state.user.userPhoneNumber}
                    type="number"
                    onChange={(event) => {
                      this.setState({
                        user: {
                          ...this.state.user,
                          userPhoneNumber: event.target.value,
                        },
                      });
                    }}
                    placeholder="Telefon numarası giriniz..."
                  />
                </div>
                <div className="profileInput">
                  <label className="profileLabel">Adres :</label>
                  <Input
                    className="profileInput-width"
                    value={this.state.user.userAddress}
                    onChange={(event) => {
                      this.setState({
                        user: {
                          ...this.state.user,
                          userAddress: event.target.value,
                        },
                      });
                    }}
                    placeholder="Adres giriniz..."
                  />
                </div>
                <Button color="orange" onClick={this.handleUpdateUser}>
                  Kaydet
                </Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { security } = state;

  return { security: security };
};
export default connect(mapStateToProps, null)(Profile);
