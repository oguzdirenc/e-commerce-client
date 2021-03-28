import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { Component } from "react";
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

class Login extends Component {
  onSubmit = async () => {
    try {
      const res = await axios.post(userLoginUrl, LoginRequest);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setJWTToken(token);
      const decodedToken = jwtDecode(token);
    } catch (error) {
      console.log(error.response.data);
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
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                />

                <Button color="teal" fluid size="large">
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

export default Login;
