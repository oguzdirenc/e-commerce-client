import "./App.css";
import Admin from "./components/Admin";
import AllBooks from "./components/AllBooks";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import SaveBook from "./components/SaveBook";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/allBooks" component={AllBooks}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/modal" component={SaveBook}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
