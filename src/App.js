import { Routes, Route, Link } from "react-router-dom";
// import "./App.css";
import "./css/Reset.css";
import "./css/App.scss";
import Navation from "./component/headerComponent/Navation";
import Main from "./page/Main";
import Search from "./page/Search";
import Footer from "./component/Footer";

function App() {
  return (
    <div id="wrap">
      <header>
        <Navation />
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
