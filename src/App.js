import "./App.css";
import React, { Component } from "react";
import Admin from "./components/Admin";
import AllBooks from "./components/AllBooks";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import SaveBook from "./components/SaveBook";
import Register from "./components/Register";
import Login from "./components/Login";
import ShoppingCart from "./components/ShoppingCart";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import SecuredRoute from "./securityUtils/SecureRoute";
import { login, logout } from "./redux/actions/securityActions";
import Order from "./components/Order";
import Search from "./components/Search";
import BookDetails from "./components/BookDetails";
import { BookCard } from "./components/BookCard";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch(login(decodedToken));

  /*const currentTime = Date.now();
  const firstTenDigits = Number(currentTime.toString().substr(0, 10));
  const currentTime = (new Date().getTime() + 1) / 1000;

  if (decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
    
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    store.dispatch({
      type: "SET_USER",
      payload: {},
    });
    window.location.href = "/login";
  }*/
}
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div>
            <BrowserRouter>
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/" exact component={Login} />
                <div>
                  <Navbar />
                  <SecuredRoute path="/order" component={Order} />
                  <SecuredRoute path="/allBooks" component={AllBooks} />
                  <SecuredRoute path="/admin" component={Admin} />
                  <SecuredRoute path="/modal" component={SaveBook} />
                  <SecuredRoute path="/shoppingCart" component={ShoppingCart} />
                  <SecuredRoute path="/search/:bookName" component={Search} />
                  <SecuredRoute path="/bookDetails" component={BookDetails} />
                </div>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
