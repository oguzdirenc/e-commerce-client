import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { userRegisterUrl } from "../all_api/constants";
import { connect } from "react-redux";
import "../styles/Login.css";
import "../styles/Register.css";

class Register extends Component {
  state = {
    newUser: {
      username: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    },
    errors: {},
  };

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("allBooks");
    }
  }

  handleRegister = async () => {
    try {
      await axios.post(userRegisterUrl, this.state.newUser).then((response) => {
        console.log(response.data);
        this.props.history.push("/");
        this.setState({
          errors: {},
        });
      });
    } catch (error) {
      this.setState({
        errors: error.response.data,
      });
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Grid
          className="main-color"
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange" textAlign="center">
              KAYIT OL
            </Header>
            <Form size="large">
              <Segment stacked>
                {this.state.errors.username ? (
                  <h6 className="errorMessage">{this.state.errors.username}</h6>
                ) : (
                  ""
                )}
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail adresi"
                  value={this.state.newUser.username}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        username: event.target.value,
                      },
                    })
                  }
                />
                {this.state.errors.fullName ? (
                  <h6 className="errorMessage">{this.state.errors.fullName}</h6>
                ) : (
                  ""
                )}
                <Form.Input
                  className="errorInput"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Ad Soyad"
                  value={this.state.newUser.fullName}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        fullName: event.target.value,
                      },
                    })
                  }
                />
                {this.state.errors.password ? (
                  <h6 className="errorMessage">{this.state.errors.password}</h6>
                ) : (
                  ""
                )}
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  value={this.state.newUser.password}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        password: event.target.value,
                      },
                    })
                  }
                />
                {this.state.errors.confirmPassword ? (
                  <h6 className="errorMessage">
                    {this.state.errors.confirmPassword}
                  </h6>
                ) : (
                  ""
                )}
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre (Tekrar)"
                  type="password"
                  value={this.state.newUser.confirmPassword}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        confirmPassword: event.target.value,
                      },
                    })
                  }
                />

                <Button
                  color="orange"
                  fluid
                  size="large"
                  onClick={this.handleRegister}
                >
                  Kayıt Ol
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, null)(Register);
