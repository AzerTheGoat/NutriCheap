import logo from './logo.svg';
import './App.css';
import Search from "./Components/Search";
import {Fragment, useState} from "react";
import NavBar from "./Components/NavBar";
import search from "./Components/Search";

function App() {
  const [product, setProduct] = useState([]);

  return (
      <div className={"h-screen bg-gradient-to-r from-cyan-500 to-blue-500"}>
          <NavBar setProduct={setProduct}/>
          <Search product={product} setProduct={setProduct}/>
      </div>
  );
}

export default App;
