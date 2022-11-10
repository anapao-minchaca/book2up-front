import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <nav>
        <div className="header">
          <a href="/">
            <img
              src="https://github.com/anapao-minchaca/Book2Up/blob/main/frontend/img/logo.png?raw=true"
              alt="book2uplogo"
            />
          </a>
        </div>

      </nav>
      <header>
        <h1>Discover New Stories </h1>
        <Link to="/login" className="button">
          Entra ahora
        </Link>
      </header>
    </>
  );
};

export default Home;
