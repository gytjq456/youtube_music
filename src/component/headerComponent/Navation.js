import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Navation = () => {
  return (
    <section>
      <h1>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/YouTube_Music_short_logo_with_white_wordmark.svg/1200px-YouTube_Music_short_logo_with_white_wordmark.svg.png?20210423141124"
            alt=""
          />
        </Link>
      </h1>
      <div className="schForm">
        <Search />
      </div>
    </section>
  );
};

export default Navation;
