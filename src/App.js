import "./App.css";
import Admin from "./components/Admin";
import AllBooks from "./components/AllBooks";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllBooks />
      <Admin />
    </div>
  );
}

export default App;
