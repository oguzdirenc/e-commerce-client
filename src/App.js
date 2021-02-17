import "./App.css";
import AllBooks from "./components/AllBooks";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllBooks />
    </div>
  );
}

export default App;
