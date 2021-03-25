import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { userRegisterUrl } from "../all_api/constants";

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

  handleRegister = () => {
    try {
      axios
        .post(userRegisterUrl, this.state.newUser)
        .then((response) => console.log(response.data));
      this.props.history.push("/login");
      this.setState({
        errors: {},
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
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              KAYIT OL
            </Header>
            <Form size="large">
              <Segment stacked>
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
                <Form.Input
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
                  color="teal"
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
export default Register;
