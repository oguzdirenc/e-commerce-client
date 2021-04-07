import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { userLoginUrl } from "../all_api/constants";
import setJWTToken from "../securityUtils/setJWTToken";
import { login } from "../redux/actions/securityActions";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
  };

  onSubmit = async () => {
    try {
      const LoginRequest = {
        username: this.state.username,
        password: this.state.password,
      };
      const res = await axios.post(userLoginUrl, LoginRequest);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setJWTToken(token);
      const decodedToken = jwtDecode(token);
      this.props.login(decodedToken);
      this.setState({ errors: {} });
      this.props.history.push("/allBooks");
    } catch (error) {
      this.setState({ errors: error.response.data });
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
              <Image src="/logo.png" /> Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail adresi"
                  value={this.state.username}
                  onChange={(event) =>
                    this.setState({ username: event.target.value })
                  }
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
                <Button onClick={() => console.log(this.props)}>
                  location
                </Button>

                <Button onClick={this.onSubmit} color="teal" fluid size="large">
                  Giriş
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
