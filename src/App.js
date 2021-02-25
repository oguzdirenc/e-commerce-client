import { Form } from "semantic-ui-react";
import "./App.css";
import Admin from "./components/Admin";
import AllBooks from "./components/AllBooks";
import { Navbar } from "./components/Navbar";
import { Route, BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/allBooks" component={AllBooks}></Route>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
