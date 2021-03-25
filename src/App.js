import "./App.css";
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

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/allBooks" component={AllBooks}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/modal" component={SaveBook}></Route>
            <Route path="/shoppingCart" component={ShoppingCart}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
